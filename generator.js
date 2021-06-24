const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs')

const image = fs.readFileSync('./assets/img/background.jpg')
const base64Image = new Buffer.from(image).toString('base64')
const dataURI = 'data:image/jpeg;base64,' + base64Image

module.exports = async function generate(header, text) {
  await nodeHtmlToImage({
    output: './out.png',
    html: `
    <html>
      <head>
        <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Consolas, monaco, monospace; 
          color: white
        }
        body {
          padding: 7vw;
          width: 5120px;
          height: 2048px;
        }
        h1 {
          font-size: 180px;
          margin-bottom: 140px;
          font-weight: 600;
        }

        p {
          font-size: 180px;
          line-height: 240px;
        }

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: -1;
        }
        </style>
      </head> 
      <body>
        <h1>{{header}}</h1>
        <p>{{text}}</p>
        <img src="{{imageSource}}">
      </body>
    </html>
    `,
    content: {
      imageSource: dataURI,
      header,
      text
    }
  })
}
