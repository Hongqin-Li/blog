from parse import parse_header, parse_title, parse_excerpt


def test_parse():
    s = """
+++

abc

+++

## title with space

### title2

excerpt

"""

    toml, md = parse_header(s)
    assert(toml == "\nabc\n\n")

    title, md = parse_title(md)
    assert(title == "title with space")
    assert(md == "\n### title2\n\nexcerpt\n\n")

    excerpt = parse_excerpt(md)
    assert(excerpt == "excerpt")

    try:
        parse_header("a\n" + s)
        assert(0)
    except Exception:
        pass
