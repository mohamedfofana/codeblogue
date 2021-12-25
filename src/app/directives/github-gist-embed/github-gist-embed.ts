import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gh-gist',
  template:`
    <iframe #iframe type="text/javascript"  width="100%" style="padding:0;margin:0;height:-webkit-fill-available;" frameborder="0" ></iframe>
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})

export class GithubGistComponent implements AfterViewInit {
  @ViewChild('iframe') iframe:ElementRef;
  @Input() gistId;
  @Input() file:string;

  ngAfterViewInit() {
    this.iframe.nativeElement.id = 'gist-' + this.gistId;
    let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentElement.contentWindow;
    let fileString = "";
    if (this.file){
      fileString = "?file="+this.file;
    }
    let content = `
      <html>
      <head>
        <base target="_parent">
      </head>
      <body onload="parent.document.getElementById('${this.iframe.nativeElement.id}')" style="padding:0;margin:0;">
      <script type="text/javascript" src="https://gist.github.com/mohamedfofana/${this.gistId}.js${fileString}"></script>
      </body>
    </html>
  `;
    doc.open();
    doc.write(content);
    doc.close();
  }
}
