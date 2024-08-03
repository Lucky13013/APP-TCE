import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { useTranslation } from 'react-i18next';
import RNFetchBlob from 'react-native-blob-util';

export default function Ler_PDF({ route }) {
  const { article } = route.params;
  const { i18n } = useTranslation();
  const pdfUrl = article.link_pdf;

  // Atualizar o link com a linguagem do i18n
  const updatedPdfUrl = pdfUrl
    .replace(/lng=[^&]*/, `lng=${i18n.language}`)
    .replace(/tlng=[^&]*/, `tlng=${i18n.language}`);

  console.log('Antigo link:', pdfUrl);
  console.log('Novo link:', updatedPdfUrl);

  useEffect(() => {
    // Certifique-se de que o PDF pode ser acessado corretamente
    RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', updatedPdfUrl)
      .then((res) => {
        console.log('Response:', res);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [updatedPdfUrl]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {updatedPdfUrl ? (
        <Pdf
          source={{ uri: updatedPdfUrl, cache: true }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {}}
          onError={(error) => {
            console.log(error);
          }}
          style={{ flex: 1, width: '100%' }}
          renderActivityIndicator={() => <ActivityIndicator size="large" color="#0000ff" />}
        />
      ) : (
        <Text>Unable to load PDF.</Text>
      )}
    </View>
  );
}