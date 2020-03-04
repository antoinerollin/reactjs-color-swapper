/**
 * The Drag'n'Drop library used here is not compatible with Cypress.
 * Here is a way to make it compatible.
 * Source : https://github.com/cypress-io/cypress/issues/1752
 */

export default class DndSimulatorDataTransfer {
    constructor() {
        this.data = {}
    }

    clearData(format) {
        if (format) {
            delete this.data[format]
            const index = this.types.indexOf(format)
            delete this.types[index]
            delete this.data[index]
        }
        else {
            this.data = {}
        }
    }
    setData(format, data) {
        this.data[format] = data
        this.items.push(data)
        this.types.push(format)
    }
    getData(format) {
        if (format in this.data) {
            return this.data[format]
        }
        return ""
    }
    setDragImage(img, xOffset, yOffset) {
        // since simulation doesn"t replicate the visual
        // effects, there is no point in implementing this
    }
}

DndSimulatorDataTransfer.prototype.dropEffect = "move"
DndSimulatorDataTransfer.prototype.effectAllowed = "all"
DndSimulatorDataTransfer.prototype.files = []
DndSimulatorDataTransfer.prototype.items = []
DndSimulatorDataTransfer.prototype.types = []





