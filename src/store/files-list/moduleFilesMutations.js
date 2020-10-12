export default {
    ADD_FILE (state, file) {
        state.files.unshift(file)
    },
    SET_FILES (state, files) {
        state.files = files
    },

    SET_FILES_TOTAL (state, total) {
    state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
        state.pages = pages
    },

    SET_FILE (state, file) {
    state.file = file
    },
    // SET_LABELS(state, labels) {
    //   state.eventLabels = labels
    // },
    UPDATE_FILE (state, file) {
        const fileIndex = state.files.findIndex((p) => p.fid === file.fid)
        Object.assign(state.files[fileIndex], file)
    },
    REMOVE_ITEM (state, fileId) {
        const ItemIndex = state.files.findIndex((p) => p.fid === fileId)
        state.files.splice(ItemIndex, 1)
    },

    // REMOVE_ITEMS(state, selectedFiles) {

    //     const indexSet = new Set(selectedFiles);

    //     const arrayWithValuesRemoved = state.files.filter((value, i) => !indexSet.has(i));

    // }
}