    function renderHtml(codes) {
      let style = codes.style || "",
          body = codes.html || "", 
          script = codes.js || "";
          return `
                          <!doctype html>
                          <html>
                            <head>
        <link rel="stylesheet" href="./css/larkbin/dat.gui.css">
        <script data-slax-config="boot:'main'" src="./js/larkbin/skylark-slax-runtime-all.js"></script>
        <script  src="./js/larkbin/skylark-zlib.js"></script>
        <script  src="./js/larkbin/skylark-threejs.js"></script>
        <script  src="./js/larkbin/skylark-threejs-ex.js"></script>
        <script  src="./js/larkbin/skylark-datgui.js"></script>
                              <script>
                                (function () {
                                  window.addEventListener('DOMContentLoaded', function () {
                                    window.parent.postMessage(JSON.stringify({
                                      type: 'codeg-dom-ready'
                                    }), '*')
                                  })
                                }())
                              </script>

                              <style>${ style }</style>
                            </head>
                            <body>
                              ${ body }

                              <!--
                                CodeGround:
                                Empty script tag prevents malformed HTML from breaking the next script.
                              -->
                              <script></script>
                              <script>${ script }</script>
                            </body>
                          </html>
                        `;
    }  