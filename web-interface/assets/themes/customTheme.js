define('ace/theme/customTheme', ['require', 'exports', 'module', 'ace/lib/dom'], function(require, exports, module) {
    exports.isDark = false;
    exports.cssClass = 'ace-custom-theme';
    exports.cssText = `
        .ace-custom-theme {
            /* Base editor background/text */
            background-color: #ffffff;
            color: #303030;
        }
        .ace-custom-theme .ace_gutter {
            background: #f0f0f0;
            color: #999999;
        }
        .ace-custom-theme .ace_print-margin {
            width: 1px;
            background: #e8e8e8;
        }
        /* Cursor */
        .ace-custom-theme .ace_cursor {
            color: #000000;
        }
        /* Selection */
        .ace-custom-theme .ace_marker-layer .ace_selection {
            background: #d7d4f0;
        }

        /* Font for normal text in the editor */
        .ace-custom-theme .ace_editor {
            font-family: 'Fira Code', monospace;
            font-weight: 300;
        }

        /* Example: Different font for function names */
        .ace-custom-theme .ace_function {
            font-family: 'Fira Code', serif; /* or another font */
            font-weight: 600;
        }

        /* Other tokens you can override:
           .ace_keyword, .ace_string, .ace_comment, .ace_variable, etc.
           Each can have its own font or style as needed.
         */
    `;
    const dom = require('ace/lib/dom');
    dom.importCssString(exports.cssText, exports.cssClass);
});