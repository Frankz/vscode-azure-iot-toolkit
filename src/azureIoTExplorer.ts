// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

"use strict";
import * as vscode from "vscode";
import { DeviceExplorer } from "./deviceExplorer";
import { IoTEdgeExplorer } from "./iotEdgeExplorer";
import { IotHubC2DMessageExplorer } from "./iotHubC2DMessageExplorer";
import { IotHubDeviceTwinExplorer } from "./iotHubDeviceTwinExplorer";
import { IotHubDirectMethodExplorer } from "./iotHubDirectMethodExplorer";
import { IoTHubMessageExplorer } from "./iotHubMessageExplorer";
import { IoTHubResourceExplorer } from "./iotHubResourceExplorer";
import { DeviceItem } from "./Model/DeviceItem";
import { ModuleItem } from "./Model/ModuleItem";
import { SnippetManager } from "./snippetManager";
import { WelcomePage } from "./welcomePage";

export class AzureIoTExplorer {
    private _iotHubC2DMessageExplorer: IotHubC2DMessageExplorer;
    private _iotHubMessageExplorer: IoTHubMessageExplorer;
    private _deviceExplorer: DeviceExplorer;
    private _snippetManager: SnippetManager;
    private _iotHubDirectMethodExplorer: IotHubDirectMethodExplorer;
    private _iotHubDeviceTwinExplorer: IotHubDeviceTwinExplorer;
    private _iotHubResourceExplorer: IoTHubResourceExplorer;
    private _iotEdgeExplorer: IoTEdgeExplorer;
    private _welcomePage: WelcomePage;

    constructor(private context: vscode.ExtensionContext) {
        let outputChannel = vscode.window.createOutputChannel("Azure IoT Toolkit");
        this._iotHubC2DMessageExplorer = new IotHubC2DMessageExplorer(outputChannel);
        this._iotHubMessageExplorer = new IoTHubMessageExplorer(outputChannel);
        this._deviceExplorer = new DeviceExplorer(outputChannel);
        this._snippetManager = new SnippetManager(outputChannel);
        this._iotHubDirectMethodExplorer = new IotHubDirectMethodExplorer(outputChannel);
        this._iotHubDeviceTwinExplorer = new IotHubDeviceTwinExplorer(outputChannel);
        this._iotHubResourceExplorer = new IoTHubResourceExplorer(outputChannel);
        this._iotEdgeExplorer = new IoTEdgeExplorer(outputChannel);
        this._welcomePage = new WelcomePage(this.context);
    }

    public sendD2CMessage(deviceItem?: DeviceItem): void {
        this._iotHubMessageExplorer.sendD2CMessage(deviceItem);
    }

    public startMonitorIoTHubMessage(deviceItem?: DeviceItem): void {
        this._iotHubMessageExplorer.startMonitorIoTHubMessage(deviceItem);
    }

    public stopMonitorIoTHubMessage(): void {
        this._iotHubMessageExplorer.stopMonitorIoTHubMessage();
    }

    public sendC2DMessage(deviceItem?: DeviceItem): void {
        this._iotHubC2DMessageExplorer.sendC2DMessage(deviceItem);
    }

    public startMonitorC2DMessage(deviceItem?: DeviceItem): void {
        this._iotHubC2DMessageExplorer.startMonitorC2DMessage(deviceItem);
    }

    public stopMonitorC2DMessage(): void {
        this._iotHubC2DMessageExplorer.stopMonitorC2DMessage();
    }

    public listDevice(): void {
        this._deviceExplorer.listDevice();
    }

    public async getDevice(deviceItem: DeviceItem, iotHubConnectionString?: string, outputChannel?: vscode.OutputChannel) {
        return this._deviceExplorer.getDevice(deviceItem, iotHubConnectionString, outputChannel);
    }

    public async createDevice(edgeDevice: boolean = false, iotHubConnectionString?: string, outputChannel?: vscode.OutputChannel) {
        return this._deviceExplorer.createDevice(edgeDevice, iotHubConnectionString, outputChannel);
    }

    public async deleteDevice(deviceItem?: DeviceItem) {
        return this._deviceExplorer.deleteDevice(deviceItem);
    }

    public invokeDeviceMethod(deviceItem: DeviceItem): void {
        this._iotHubDirectMethodExplorer.invokeDeviceMethod(deviceItem);
    }

    public getDeviceTwin(deviceItem: DeviceItem): void {
        this._iotHubDeviceTwinExplorer.getDeviceTwin(deviceItem);
    }

    public updateDeviceTwin(): void {
        this._iotHubDeviceTwinExplorer.updateDeviceTwin();
    }

    public async createIoTHub(outputChannel?: vscode.OutputChannel) {
        return this._iotHubResourceExplorer.createIoTHub(outputChannel);
    }

    public selectIoTHub(outputChannel?: vscode.OutputChannel) {
        return this._iotHubResourceExplorer.selectIoTHub(outputChannel);
    }

    public copyIoTHubConnectionString(): void {
        this._iotHubResourceExplorer.copyIoTHubConnectionString();
    }

    public copyDeviceConnectionString(deviceItem: DeviceItem): void {
        this._iotHubResourceExplorer.copyDeviceConnectionString(deviceItem);
    }

    public replaceConnectionString(event: vscode.TextDocumentChangeEvent): void {
        this._snippetManager.replaceConnectionString(event);
    }

    public createDeployment(input?: DeviceItem | vscode.Uri): void {
        this._iotEdgeExplorer.createDeployment(input);
    }

    public createDeploymentAtScale(fileUri?: vscode.Uri): void {
        this._iotEdgeExplorer.createDeploymentAtScale(fileUri);
    }

    public async getModuleTwin(moduleItem: ModuleItem) {
        await this._iotEdgeExplorer.getModuleTwin(moduleItem);
    }

    public async updateModuleTwin() {
        await this._iotEdgeExplorer.updateModuleTwin();
    }

    public generateSasTokenForIotHub(): void {
        this._iotHubResourceExplorer.generateSasTokenForIotHub();
    }

    public generateSasTokenForDevice(deviceItem: DeviceItem): void {
        this._iotHubResourceExplorer.generateSasTokenForDevice(deviceItem);
    }

    public checkAndShowWelcomePage(): void {
        this._welcomePage.checkAndShow();
    }

    public showWelcomePage(): void {
        this._welcomePage.show();
    }
}
