Prism.languages.markup = {
	'comment': /&lt;!--[\w\W]*?--(>|&gt;)/g,
	'prolog': /&lt;\?.+?\?(>|&gt;)/,
	'doctype': /&lt;!DOCTYPE.+?(>|&gt;)/,
	'cdata': /&lt;!\[CDATA\[[\w\W]+]]&gt;/i,
	'tag': {
		pattern: /(&lt;|<)\/?[\w:-]+\s*[\w\W]*?(>|&gt;)/gi,
		inside: {
			'tag': {
				pattern: /^(&lt;|<)\/?[\w:-]+/i,
				inside: {
					'punctuation': /^(&lt;|<)\/?/,
					'namespace': /^[\w-]+?:/
				}
			},
			'attr-value': {
				pattern: /=(('|")[\w\W]*?(\2)|[^\s>]+)/gi,
				inside: {
					'punctuation': /=/g
				}
			},
			'punctuation': /\/?&gt;|\/?>/g,
			'attr-name': {
				pattern: /[\w:-]+/g,
				inside: {
					'namespace': /^[\w-]+?:/
				}
			}
			
		}
	},
	'entity': /&amp;#?[\da-z]{1,8};/gi
};

if (Prism.languages.javascript) {
	Prism.languages.insertBefore('markup', 'cdata', {
		'script': {
			pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,
			inside: {
				'tag': {
					pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.javascript
			}
		}
	});
}

if (Prism.languages.css) {
	Prism.languages.insertBefore('markup', 'cdata', {
		'style': {
			pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,
			inside: {
				'tag': {
					pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.css
			}
		}
	});
}

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});