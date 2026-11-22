#!/usr/bin/env python3
# Copyright © 2026 Michael Thomason. SPDX-License-Identifier: MIT
"""Tests for the built marketing-site checker.

Run with: python3 -I scripts/check_site_test.py
"""

import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import check_site


class CheckSiteTest(unittest.TestCase):
	def setUp(self):
		self._tmp = tempfile.TemporaryDirectory()
		self.root = Path(self._tmp.name)

	def tearDown(self):
		self._tmp.cleanup()

	def write(self, relpath, text):
		path = self.root / relpath
		path.parent.mkdir(parents=True, exist_ok=True)
		path.write_text(text, encoding="utf-8")

	def test_valid_relative_link(self):
		self.write("index.html", '<a href="contact.html">Contact</a>')
		self.write("contact.html", "<p>Contact</p>")
		self.assertEqual(check_site.check_links(str(self.root)), [])

	def test_broken_relative_link(self):
		self.write("index.html", '<a href="missing.html">Missing</a>')
		self.assertEqual(check_site.check_links(str(self.root)), [("index.html", "missing.html")])

	def test_external_and_anchor_links_are_ignored(self):
		self.write("index.html", '<a href="https://example.com">x</a><a href="#top">y</a><a href="mailto:a@b">z</a>')
		self.assertEqual(check_site.check_links(str(self.root)), [])

	def test_directory_resolves_index(self):
		self.write("index.html", '<a href="/de/">Deutsch</a>')
		self.write("de/index.html", "<p>Deutsch</p>")
		self.assertEqual(check_site.check_links(str(self.root)), [])

	def test_source_markdown_is_reported(self):
		self.write("README.md", "# source")
		self.assertEqual(check_site.source_markdown(str(self.root)), ["README.md"])

	def test_missing_language_pages_are_reported(self):
		for page in check_site.PAGES:
			self.write(page, "<p>en</p>")
		self.assertEqual(check_site.missing_pages(str(self.root), languages=()), [])
		self.assertEqual(len(check_site.missing_pages(str(self.root), languages=("de",))), len(check_site.PAGES))

	def test_duplicate_sitemap_location_is_reported(self):
		self.write("sitemap.xml", "<urlset><url><loc>https://x/</loc></url><url><loc>https://x/</loc></url></urlset>")
		self.assertEqual(check_site.sitemap_duplicates(str(self.root)), ["https://x/"])


if __name__ == "__main__":
	unittest.main()
