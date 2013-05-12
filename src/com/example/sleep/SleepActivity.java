package com.example.sleep;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.provider.Settings;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

public class SleepActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
		setContentView(R.layout.layout);
		createWebView();
	}
	@SuppressLint("SetJavaScriptEnabled")
	private void createWebView () {
		final WebView webView = (WebView) findViewById(R.id.webview);
		WebSettings webSettings = webView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		webView.addJavascriptInterface(new JavaScriptInterface(), "android");
		webView.loadUrl("file:///android_asset/index.html");
	}
	private void setTimeout (int time) {
		Settings.System.putInt(getContentResolver(), Settings.System.SCREEN_OFF_TIMEOUT, time);
	}
	private int getTimeout () {
		return Settings.System.getInt(getContentResolver(), Settings.System.SCREEN_OFF_TIMEOUT, 0);
	}
	private void message (final String str) {
		Toast.makeText(getApplicationContext(), str, Toast.LENGTH_SHORT).show();
	}
	@SuppressWarnings("unused")
	private class JavaScriptInterface {
		public void setTime (final int time) {
			setTimeout(time);
		}
		public int getTime () {
			return getTimeout();
		}
		public void alert (final String str) {
			message(str);
		}
		public void exit () {
			finish();
		}
	}
}