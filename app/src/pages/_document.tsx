import { DocumentProps, Head, Html, Main, NextScript } from 'next/document'
import { useAppContext } from 'src/components/state';

export const Document: React.FC<DocumentProps> = () => {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../assets/img/shark.png"
        />
      </Head>
      <body>
        <div id="modal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
