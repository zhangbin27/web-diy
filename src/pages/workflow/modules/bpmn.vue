<template>
  <div class="bpmn-container">
  </div>
</template>

<script>
  import $ from 'jquery'
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
  import { debounce } from 'min-dash'
  import service from '../service'

  export default {
    name: 'bpmn',
    data () {
      return {}
    },
    props: {
      workflow: {
        type: Object,
        required: true
      }
    },
    methods: {
      toggle (close = false) {
        $('#app').toggleClass('hidden')
        $('.bpmn-root').toggleClass('hidden')
        if (close) {
          console.log('close $emit$emit', close)
          this.$emit('close')
        }
      }
    },
    mounted () {
      var container = $('#js-drop-zone')

      var canvas = $('#js-canvas')

      var bpmnModeler = new BpmnModeler({
        container: canvas,
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          propertiesPanelModule,
          propertiesProviderModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })

      function createNewDiagram (xml = service.getDefaultXMLSync()) {
        openDiagram(xml) // diagramXML
      }

      function openDiagram (xml) {
        bpmnModeler.importXML(xml, function (err) {
          if (err) {
            container
              .removeClass('with-diagram')
              .addClass('with-error')

            container.find('.error pre').text(err.message)

            console.error(err)
          } else {
            container
              .removeClass('with-error')
              .addClass('with-diagram')
          }
        })
      }

      function saveSVG (done) {
        bpmnModeler.saveSVG(done)
      }

      function saveDiagram (done) {
        bpmnModeler.saveXML({format: true}, function (err, xml) {
          done(err, xml)
        })
      }

      function registerFileDrop (container, callback) {
        function handleFileSelect (e) {
          e.stopPropagation()
          e.preventDefault()

          var files = e.dataTransfer.files

          var file = files[0]

          var reader = new FileReader()

          reader.onload = function (e) {
            var xml = e.target.result
            callback(xml)
          }

          reader.readAsText(file)
        }

        function handleDragOver (e) {
          e.stopPropagation()
          e.preventDefault()

          e.dataTransfer.dropEffect = 'copy' // Explicitly show this is a copy.
        }

        container.get(0).addEventListener('dragover', handleDragOver, false)
        container.get(0).addEventListener('drop', handleFileSelect, false)
      }

      // check file api availability
      if (!window.FileList || !window.FileReader) {
        window.alert(
          'Looks like you use an older browser that does not support drag and drop. ' +
          'Try using Chrome, Firefox or the Internet Explorer > 10.')
      } else {
        registerFileDrop(container, openDiagram)
      }

      // bootstrap diagram functions
      var _this = this
      $(function () {
        $('#js-create-diagram').click(function (e) {
          e.stopPropagation()
          e.preventDefault()

          createNewDiagram()
        })
        if (_this.workflow.xml) {
          createNewDiagram(_this.workflow.xml)
        }
        var downloadLink = $('#js-download-diagram')
        var downloadSvgLink = $('#js-download-svg')

        $('.buttons a').click(function (e) {
          if (!$(this).is('.active')) {
            e.preventDefault()
            e.stopPropagation()
          }
        })
        $('#bpmn-close').click(() => {
          _this.toggle(true)
        })

        function setEncoded (link, name, data, download) {
          var encodedData = encodeURIComponent(data)

          if (data) {
            link.addClass('active')
            if (download) {
              link.attr({
                'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                'download': name
              })
            } else {
              link.click(function (e) {
                e.stopPropagation()
                e.preventDefault()
                _this.workflow.xml = data
                service.save(_this.workflow).then(() => {
                  _this.toggle(true)
                })
              })
            }
          } else {
            link.removeClass('active')
          }
        }

        var exportArtifacts = debounce(function () {
          saveSVG(function (err, svg) {
            setEncoded(downloadSvgLink, (_this.workflow.name || 'diagram') + '.svg', err ? null : svg, true)
          })

          saveDiagram(function (err, xml) {
            setEncoded(downloadLink, (_this.workflow.name || 'diagram') + '.bpmn', err ? null : xml)
          })
        }, 500)

        bpmnModeler.on('commandStack.changed', exportArtifacts)
      })
      this.toggle()
    }
  }
</script>

<style lang="less">
  @import "../../../../node_modules/bpmn-js-properties-panel/styles/properties";

  * {
    box-sizing: border-box;
  }

  a:link {
    text-decoration: none;
  }

  .content.bpmn-root {
    position: relative;
    width: 100%;
    height: 100%;

    > .message {
      width: 100%;
      height: 100%;
      text-align: center;
      display: table;

      font-size: 16px;
      color: #111;

      .note {
        vertical-align: middle;
        text-align: center;
        display: table-cell;
      }

      .error {
        .details {
          max-width: 500px;
          font-size: 12px;
          margin: 20px auto;
          text-align: left;
        }

        pre {
          border: solid 1px #CCC;
          background: #EEE;
          padding: 10px;
        }
      }
    }
    &:not(.with-error) .error,
    &.with-error .intro,
    &.with-diagram .intro {
      display: none;
    }

    .canvas {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .canvas,
    .properties-panel-parent {
      display: none;
    }

    &.with-diagram {
      .canvas,
      .properties-panel-parent {
        display: block;
      }
    }
  }

  .buttons.bpmn-root {
    position: fixed;
    bottom: 20px;
    left: 20px;

    padding: 0;
    margin: 0;
    list-style: none;

    > li {
      display: inline-block;
      margin-right: 10px;

      > a {
        background: #DDD;
        border: solid 1px #666;
        display: inline-block;
        padding: 5px;
      }
    }

    a {
      opacity: 0.3;
    }

    a.active {
      opacity: 1.0;
    }
  }

  .properties-panel-parent {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 260px;
    z-index: 10;
    border-left: 1px solid #ccc;
    overflow: auto;
    &:empty {
      display: none;
    }
    > .djs-properties-panel {
      padding-bottom: 70px;
      min-height: 100%;
    }
  }

  .bjs-powered-by {
    display: none;
  }

  .properties-panel-parent {
    width: 350px !important;
  }

  #bpmn-close {
    cursor: pointer;
  }

</style>
