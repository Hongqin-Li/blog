# -*- coding: utf-8 -*-

'''
Math extension for Python-Markdown
==================================

Adds support for displaying math formulas using
[MathJax](http://www.mathjax.org/).

Author: 2015-2020, Dmitry Shachnev <mitya57@gmail.com>.
'''

from xml.etree.ElementTree import Element
from markdown.inlinepatterns import InlineProcessor
from markdown.extensions import Extension
from markdown.util import AtomicString


class InlineMathPattern(InlineProcessor):
    def handleMatch(self, m, data):
        node = Element('script')
        node.set('type', self._content_type)
        node.text = AtomicString(m.group(2))
        return node, m.start(0), m.end(0)


class DisplayMathPattern(InlineProcessor):
    def handleMatch(self, m, data):
        node = Element('script')
        node.set('type', '%s; mode=display' % self._content_type)
        if '\\begin' in m.group(1):
            node.text = AtomicString(m.group(0))
        else:
            node.text = AtomicString(m.group(2))
        return node, m.start(0), m.end(0)


class MathExtension(Extension):
    def __init__(self, *args, **kwargs):
        self.config = {
            'enable_dollar_delimiter':
                [False, 'Enable single-dollar delimiter'],
        }
        super(MathExtension, self).__init__(*args, **kwargs)

    def extendMarkdown(self, md):
        content_type = 'math/tex'

        inlinemathpatterns = (
            InlineMathPattern(r'(?<!\\|\$)(\$)([^\$]+)(\$)'),    # $...$
        )
        mathpatterns = (
            DisplayMathPattern(r'(?<!\\)(\$\$)([^\$]+)(\$\$)'),  # $$...$$
        )
        if not self.getConfig('enable_dollar_delimiter'):
            inlinemathpatterns = inlinemathpatterns[1:]

        for i, pattern in enumerate(mathpatterns):
            pattern._content_type = content_type
            # we should have higher priority than 'escape' which has 180
            md.inlinePatterns.register(pattern, 'math-%d' % i, 185)
        for i, pattern in enumerate(inlinemathpatterns):
            pattern._content_type = content_type
            priority = 185
            md.inlinePatterns.register(pattern, 'math-inline-%d' % i, priority)
        if self.getConfig('enable_dollar_delimiter'):
            md.ESCAPED_CHARS.append('$')


def makeExtension(*args, **kwargs):
    return MathExtension(*args, **kwargs)
