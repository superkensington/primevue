import { mount } from '@vue/test-utils';
import Tree from './Tree.vue';

describe('Tree.vue', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = mount(Tree, {
            props: {
                value: [
                    {
                        key: '0',
                        label: 'Documents',
                        data: 'Documents Folder',
                        icon: 'pi pi-fw pi-inbox',
                        children: []
                    }
                ]
            },
            slots: {
                default: `<input data-tree-input />`
            }
        });
    });

    it('should exists', () => {
        expect(wrapper.find('.p-tree.p-component').exists()).toBe(true);
    });

    it('triggers event', async () => {
        wrapper.trigger('keydown.space');
        expect(wrapper.emitted('keydown')).toBeTruthy();
    });

    it('stops event propagation from content', async () => {
        // If the event propagation is not stopped from content, then inputs would not work as expected
        let textInput = wrapper.find('input[data-tree-input]');

        await textInput.trigger('keydown.space');

        expect(wrapper.emitted('keydown')).toBeFalsy();
    });

    it('emits update:filterValue on filter input', async () => {
        wrapper = mount(Tree, {
            props: {
                filter: true
            }
        });

        let searchField = wrapper.find('input.p-inputtext');

        await searchField.trigger('keydown.space');

        expect(wrapper.emitted('filter')).toBeTruthy();
    });

    it('expands tree to filtered nodes on filter input', async () => {
        wrapper = mount(Tree, {
            props: {
                filter: true,
                value: [
                    {
                        key: '0',
                        label: 'Documents',
                        data: 'Documents Folder',
                        icon: 'pi pi-fw pi-inbox',
                        children: [
                            {
                                key: '0-0',
                                label: 'Work',
                                data: 'Work Folder',
                                icon: 'pi pi-fw pi-cog'
                            }
                        ]
                    },
                    {
                        key: '1',
                        label: 'Events',
                        data: 'Events Folder',
                        icon: 'pi pi-fw pi-calendar',
                        children: [
                            {
                                key: '1-0',
                                label: 'Meeting',
                                icon: 'pi pi-fw pi-calendar-plus',
                                data: 'Meeting'
                            }
                        ]
                    }
                ]
            }
        });

        let searchField = wrapper.find('input.p-tree-filter');

        await searchField.trigger('keydown.w');

        expect(wrapper.find('span.pi-cog').exists()).toBeTruthy();
        expect(wrapper.find('span.pi-calendar-plus').exists()).toBeFalsy();
    });

    it('should render icon', ({ expect }) => {
        expect(wrapper.find('span.pi-inbox').exists()).toBeTruthy();
        expect(wrapper.find('span.pi-inbox').classes('p-tree-node-icon')).toBeTruthy();
    });

    it('should render icon slot', ({ expect }) => {
        let wrapper = mount(Tree, {
            slots: {
                nodeicon: `<i data-node-icon/>`
            },
            props: {
                value: [
                    {
                        key: '0',
                        label: 'Documents',
                        data: 'Documents Folder',
                        children: []
                    }
                ]
            }
        });

        const nodeIcon = wrapper.find('i[data-node-icon]');

        expect(nodeIcon.exists()).toBeTruthy();
    });
});
