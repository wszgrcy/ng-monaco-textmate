import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  CyiaMonacoTextmateService,
  Monaco,
} from 'cyia-ngx-common/monaco-textmate';
import * as monaco from 'monaco-editor';
@Component({
  selector: 'app-monaco-textmate-test',
  templateUrl: './monaco-textmate-test.component.html',
  styleUrls: ['./monaco-textmate-test.component.css'],
})
export class MonacoTextmateTestComponent implements OnInit {
  @ViewChild('container', { static: true })
  containerElement?: ElementRef;
  instance: monaco.editor.IStandaloneCodeEditor;
  themeList = [];
  selectedTheme: string;
  languageList = ['typescript', 'javascript', 'html', 'css'];
  selectedLanguage = 'typescript';
  constructor(private service: CyiaMonacoTextmateService) {}

  ngOnInit() {
    this.service.setMonaco(monaco);
    this.service.init().then(async () => {
      const themeList = await this.service.getThemeList();
      this.themeList = themeList;
      this.selectedTheme = themeList[1];
      const name = await this.service.defineTheme(this.selectedTheme);
      this.instance = monaco.editor.create(
        this.containerElement?.nativeElement,
        {
          theme: name,
          value: `let a=6;`,
          language: this.selectedLanguage,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
        }
      );
    });
  }

  async change(e) {
    const name = await this.service.defineTheme(e);
    monaco.editor.setTheme(name);
  }
  changeLanguage(e) {
    monaco.editor.setModelLanguage(this.instance.getModel(), e);
  }
}
