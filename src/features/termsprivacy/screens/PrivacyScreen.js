import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';

const PrivacyScreen = () => {
    const htmlContent = `
    <div id="policy_embed_div" width="640" height="480" 
      data-policy-key="VjNGaVNHTlhRMkpGVjJ4Qk5IYzlQUT09"  data-extra="css-compatibility=true&h-align=left&table-style=accordion" > 
      Please wait while the policy is loaded. 
      If it does not load, please 
      <a rel="nofollow" href="https://app.termageddon.com/api/policy/VjNGaVNHTlhRMkpGVjJ4Qk5IYzlQUT09?css-compatibility=true&h-align=left&table-style=accordion" target="_blank">
        click here
      </a>. 
    </div>
    <script src="https://app.termageddon.com/js/termageddon-init-compatibility.js"></script>
  `;
    return (
        <SafeAreaView style={styles.container}>
            <WebView
                source={{ html: htmlContent }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
})

export default PrivacyScreen;