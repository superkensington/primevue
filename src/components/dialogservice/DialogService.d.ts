import { Plugin, VNode } from 'vue';
import { DynamicDialogOptions, DynamicDialogInstance } from '../dynamicdialogoptions';

declare const plugin: Plugin;
export default plugin;

export interface DialogServiceMethods {
    /**
     * Displays the dialog using the dynamic dialog object options.
     * @param {VNode} content - Dynamic component for content template
     * @param {DynamicDialogOptions} options - DynamicDialog Object
     * @return {@link DynamicDialogInstance}
     */
    open: (content: VNode, options?: DynamicDialogOptions) => DynamicDialogInstance;
}

declare module 'vue/types/vue' {
    interface Vue {
        $dialog: DialogServiceMethods;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $dialog: DialogServiceMethods;
    }
}
