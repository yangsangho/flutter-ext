import * as vscode from 'vscode';
import { newModel, newView } from './commands';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "flutter-ext" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand("flutter-ext.newModel", newModel),
		vscode.commands.registerCommand("flutter-ext.newView", newView)
	);
}

export function deactivate() { }
