import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";
import { WebView } from "react-native-webview";

const AnimatedBeeSvg = ({ source, width, height, style }) => {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadAnimation = async () => {
      const [asset] = await Asset.loadAsync(source);
      const response = await fetch(asset.localUri || asset.uri);
      const svg = await response.text();

      if (mounted) {
        setHtml(`<!doctype html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
              <style>
                html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; }
                svg { display: block; width: 100%; height: 100%; }
              </style>
            </head>
            <body>${svg}</body>
          </html>`);
      }
    };

    loadAnimation().catch(() => {
      if (mounted) setHtml(null);
    });

    return () => {
      mounted = false;
    };
  }, [source]);

  return (
    <View
      pointerEvents="none"
      style={[{ width, height }, style]}
    >
      {html ? (
        <WebView
          originWhitelist={["*"]}
          source={{ html }}
          javaScriptEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.webView}
          containerStyle={styles.webView}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default AnimatedBeeSvg;
