import * as vscode from 'vscode';
import { newPage, newModel } from './commands';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "flutter-ext" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand("flutter-ext.newPage", newPage),
		vscode.commands.registerCommand("flutter-ext.newModel", newModel)
	);
}

export function deactivate() { }
