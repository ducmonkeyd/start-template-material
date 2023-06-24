/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';
declare module '@app/shared/ckeditor-custom-build/build/ckeditor.js';
/*
declare module '@ckeditor/ckeditor5-build-classic' {
  const ClassicEditorBuild: any;

  export = ClassicEditorBuild;
}
*/
// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
