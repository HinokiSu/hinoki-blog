import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
import Slugify from 'slugify'
import hljs from '@web/plugins/hljs'
import anchor from 'markdown-it-anchor'

// TODO: 待优化

// 提供基础的Markdown解析
export const markdownBaseParser: any = () =>
  new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    langPrefix: 'language-',
    highlight: (str: any, lang: any) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>'
          )
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + markdownBaseParser().utils.escapeHtml(str) + '</code></pre>'
    },
  })

// 提供基础的Markdown解析和锚点及目录解析
export const markdownParser: any = (tocRef: any) =>
  new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    langPrefix: 'language-',
    highlight: (str: any, lang: any) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>'
          )
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + markdownParser(tocRef).utils.escapeHtml(str) + '</code></pre>'
    },
  })
    .use(MarkdownItAnchor, {
      permalink: anchor.permalink.linkInsideHeader({
        placement: 'before',
        symbol: '#',
      }),
      slugify: (s: string) => Slugify(s),
    })
    .use(MarkdownItTocDoneRight, {
      containerClass: 'toc', //生成的容器的类名，这样最后返回来的字符串是 <nav class="toc"><nav/>
      containerId: 'toc', //生成的容器的ID，这样最后返回来的字符串是 <nav id="toc"><nav/>
      listType: 'ul', //导航列表使用ul还是ol
      listClass: 'listClass', //li标签的样式名
      linkClass: 'linkClass', //a标签的样式名
      slugify: (s: string) => Slugify(s),
      callback: function (html: any, ast: any) {
        //把目录单独列出来
        tocRef.value.innerHTML = html
        // tocAst.value = ast
      },
    })
