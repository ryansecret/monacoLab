<template>
  <div ref="container" />
</template>

<script>
import * as monaco from 'monaco-editor'
import SQLSnippets from './core/snippets'
export default {
  name: 'Home',
  props: {
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 600,
    },
    customKeywords: {
      type: Array,
      default: () => [],
    },
    triggerCharacters: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    width: {
      immediate: true,
      handler() {
        this.monacoEditor && this.monacoEditor.layout({ width: this.width, height: this.height })
      },
    },
    height: {
      immediate: true,
      handler() {
        this.monacoEditor && this.monacoEditor.layout({ width: this.width, height: this.height })
      },
    },
  },
  mounted() {
    this.sqlSnippets = new SQLSnippets(
      monaco,
      this.customKeywords,
      this.onInputField,
      this.onInputTableAlia,
      this.dbs
    )
    this.completionItemProvider = monaco.languages.registerCompletionItemProvider('sql', {
      triggerCharacters: [' ', '.', ...this.triggerCharacters],
      provideCompletionItems: (model, position) =>
        this.sqlSnippets.provideCompletionItems(model, position),
    })
    this.monacoEditor = monaco.editor.create(this.$refs.container, {
      value: '',
      language: 'sql',
      theme: 'vs-dark',
    })
    this.monacoEditor.layout({ width: this.width, height: this.height })
  },
  beforeDestroy() {
    this.monacoEditor.dispose()
  },
}
</script>
