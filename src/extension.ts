import * as vscode from 'vscode';
import { newPage } from './commands';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "flutter-ext" is now active!');

	let disposable = vscode.commands.registerCommand('flutter-ext.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Flutter-Ext!');
	});

	context.subscriptions.push(
		disposable,
		vscode.commands.registerCommand("flutter-ext.newPage", newPage)
	);
}

export function deactivate() { }
