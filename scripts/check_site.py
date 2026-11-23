#!/usr/bin/env python3
# Copyright © 2026 Michael Thomason. SPDX-License-Identifier: MIT
"""Check the built marketing site.

Run with: python3 -I scripts/check_site.py

Checks internal href/src targets, the five-page set in every language, source
Markdown leaks, duplicate sitemap entries, and that a localized page links the
docs tree for its own language.
"""

import argparse
import os
import re
import sys
from collections import namedtuple
from urllib.parse import unquote, urlparse

LANGUAGES = ("zh", "ja", "pt-br", "de", "es")
PAGES = ("index.html", "contact.html", "mad-file-type.html", "privacy.html", "thanks.html")
DOCS_HOST = "https://docs.everydayapps.com"
DOCS_PREFIX = {"zh": "/zh", "ja": "/ja", "pt-br": "/pt-br", "de": "/de", "es": "/es"}
LINK_RE = re.compile(r"""(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')""")
LOC_RE = re.compile(r"<loc>([^<]+)</loc>")

Findings = namedtuple(
	"Findings",
	"broken missing source_markdown sitemap_duplicates sitemap_missing docs_language",
)


def _targets(path):
	targets = []
	with open(path, encoding="utf-8", errors="replace") as handle:
		for match in LINK_RE.finditer(handle.read()):
			target = match.group(1) if match.group(1) is not None else match.group(2)
			targets.append(target)
	return targets


def _skip(target):
	if not target:
		return True
	return target.startswith(("#", "http://", "https://", "mailto:", "data:", "//", "javascript:"))


def check_links(site_root):
	site_root = os.path.abspath(site_root)
	findings = []
	for dirpath, _, filenames in os.walk(site_root):
		for name in filenames:
			if not name.endswith(".html"):
				continue
			page = os.path.join(dirpath, name)
			for target in _targets(page):
				if _skip(target):
					continue
				if "{{" in target or "{%" in target:
					findings.append((os.path.relpath(page, site_root), target))
					continue
				path = unquote(urlparse(target).path)
				if not path:
					continue
				resolved = os.path.normpath(
					os.path.join(site_root, path.lstrip("/"))
					if path.startswith("/")
					else os.path.join(dirpath, path)
				)
				if os.path.isdir(resolved):
					resolved = os.path.join(resolved, "index.html")
				if not os.path.exists(resolved):
					findings.append((os.path.relpath(page, site_root), target))
	findings.sort()
	return findings


def missing_pages(site_root, languages=LANGUAGES):
	site_root = os.path.abspath(site_root)
	missing = []
	for page in PAGES:
		if not os.path.exists(os.path.join(site_root, page)):
			missing.append(page)
		for language in languages:
			relative = os.path.join(language, page)
			if not os.path.exists(os.path.join(site_root, relative)):
				missing.append(relative.replace(os.sep, "/"))
	return missing


def docs_language(site_root, languages=LANGUAGES):
	"""A localized page must link the docs tree for its own language; an
	English page must not link a language tree."""
	site_root = os.path.abspath(site_root)
	findings = []
	for dirpath, _, filenames in os.walk(site_root):
		for name in filenames:
			if not name.endswith(".html"):
				continue
			page = os.path.join(dirpath, name)
			relative = os.path.relpath(page, site_root)
			language = relative.split(os.sep, 1)[0]
			expected = DOCS_PREFIX.get(language, "")
			for target in _targets(page):
				if not target.startswith(DOCS_HOST + "/"):
					continue
				path = urlparse(target).path
				if expected:
					if not (path == expected or path.startswith(expected + "/")):
						findings.append((relative, target))
				elif any(
					path == prefix or path.startswith(prefix + "/")
					for prefix in DOCS_PREFIX.values()
				):
					findings.append((relative, target))
	findings.sort()
	return findings


def source_markdown(site_root):
	found = []
	for dirpath, _, filenames in os.walk(os.path.abspath(site_root)):
		for name in filenames:
			if name.endswith(".md"):
				found.append(os.path.relpath(os.path.join(dirpath, name), site_root).replace(os.sep, "/"))
	return sorted(found)


def sitemap_duplicates(site_root):
	path = os.path.join(os.path.abspath(site_root), "sitemap.xml")
	if not os.path.exists(path):
		return []
	with open(path, encoding="utf-8", errors="replace") as handle:
		locations = LOC_RE.findall(handle.read())
	return sorted({location for location in locations if locations.count(location) > 1})


def sitemap_missing(site_root, languages=LANGUAGES):
	path = os.path.join(os.path.abspath(site_root), "sitemap.xml")
	if not os.path.exists(path):
		return ["sitemap.xml"]
	with open(path, encoding="utf-8", errors="replace") as handle:
		paths = {unquote(urlparse(location).path) for location in LOC_RE.findall(handle.read())}
	expected = ["/", "/contact.html", "/mad-file-type.html", "/privacy.html"]
	for language in languages:
		expected.extend(
			f"/{language}/{page}"
			for page in ("", "contact.html", "mad-file-type.html", "privacy.html")
		)
	return [page for page in expected if page not in paths]


def check_site(site_root, languages=LANGUAGES):
	return Findings(
		check_links(site_root),
		missing_pages(site_root, languages),
		source_markdown(site_root),
		sitemap_duplicates(site_root),
		sitemap_missing(site_root, languages),
		docs_language(site_root, languages),
	)


def main(argv=None):
	parser = argparse.ArgumentParser(description=__doc__)
	parser.add_argument("--site", default="_site", help="built site root (default: _site)")
	args = parser.parse_args(argv)

	findings = check_site(args.site)
	for name, values in (
		("broken", findings.broken),
		("missing", findings.missing),
		("source-markdown", findings.source_markdown),
		("sitemap-duplicates", findings.sitemap_duplicates),
		("sitemap-missing", findings.sitemap_missing),
		("docs-language", findings.docs_language),
	):
		print(f"{name}: {len(values)}")
		for value in values:
			print(f"  {value}")
	return 1 if any(findings) else 0


if __name__ == "__main__":
	sys.exit(main())
