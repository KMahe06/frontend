import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { DropDownButtonItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
export const inputs = ['animationSettings', 'closeActionEvents', 'content', 'createPopupOnClick', 'cssClass', 'disabled', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'iconCss', 'iconPosition', 'itemTemplate', 'items', 'locale', 'popupWidth', 'target'];
export const outputs = ['beforeClose', 'beforeItemRender', 'beforeOpen', 'close', 'created', 'open', 'select'];
export const twoWays = [];
/**
 * Represents the Angular DropDownButton Component.
 * ```html
 * <button ejs-dropdownbutton>DropDownButton</button>
 * ```
 */
let DropDownButtonComponent = class DropDownButtonComponent extends DropDownButton {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childItems;
        this.containerContext.ngAfterContentChecked(this);
    }
};
DropDownButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownButtonComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
DropDownButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: DropDownButtonComponent, selector: "[ejs-dropdownbutton]", inputs: { animationSettings: "animationSettings", closeActionEvents: "closeActionEvents", content: "content", createPopupOnClick: "createPopupOnClick", cssClass: "cssClass", disabled: "disabled", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", iconCss: "iconCss", iconPosition: "iconPosition", itemTemplate: "itemTemplate", items: "items", locale: "locale", popupWidth: "popupWidth", target: "target" }, outputs: { beforeClose: "beforeClose", beforeItemRender: "beforeItemRender", beforeOpen: "beforeOpen", close: "close", created: "created", open: "open", select: "select" }, queries: [{ propertyName: "childItems", first: true, predicate: DropDownButtonItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
DropDownButtonComponent = __decorate([
    ComponentMixins([ComponentBase])
], DropDownButtonComponent);
export { DropDownButtonComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-dropdownbutton]',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(DropDownButtonItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd25idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Ryb3AtZG93bi1idXR0b24vZHJvcGRvd25idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxRCx1QkFBdUIsRUFBNEIsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlKLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUF1RCxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3SSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFOUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRWpFLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLG1CQUFtQixFQUFDLG1CQUFtQixFQUFDLFNBQVMsRUFBQyxvQkFBb0IsRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLHFCQUFxQixFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLGNBQWMsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsQ0FBQztBQUNwUSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxhQUFhLEVBQUMsa0JBQWtCLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25ILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFFcEM7Ozs7O0dBS0c7SUFZVSx1QkFBdUIsU0FBdkIsdUJBQXdCLFNBQVEsY0FBYztJQWF2RCxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0I7UUFDdEksS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRm5JLFNBQUksR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSTlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FJSixDQUFBO29IQTNDWSx1QkFBdUI7d0dBQXZCLHVCQUF1QixpdUJBSkMsNEJBQTRCLHVFQUhuRCw0QkFBNEI7QUFPN0IsdUJBQXVCO0lBRG5DLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLHVCQUF1QixDQTJDbkM7U0EzQ1ksdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBWG5DLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsVUFBVSxFQUFFLElBQUksWUFBWSxDQUFDLDRCQUE0QixDQUFDO3FCQUM3RDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBDb21wb25lbnRNaXhpbnMsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IERyb3BEb3duQnV0dG9uIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXNwbGl0YnV0dG9ucyc7XG5cbmltcG9ydCB7IERyb3BEb3duQnV0dG9uSXRlbXNEaXJlY3RpdmUgfSBmcm9tICcuL2l0ZW1zLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhbmltYXRpb25TZXR0aW5ncycsJ2Nsb3NlQWN0aW9uRXZlbnRzJywnY29udGVudCcsJ2NyZWF0ZVBvcHVwT25DbGljaycsJ2Nzc0NsYXNzJywnZGlzYWJsZWQnLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdpY29uQ3NzJywnaWNvblBvc2l0aW9uJywnaXRlbVRlbXBsYXRlJywnaXRlbXMnLCdsb2NhbGUnLCdwb3B1cFdpZHRoJywndGFyZ2V0J107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JlZm9yZUNsb3NlJywnYmVmb3JlSXRlbVJlbmRlcicsJ2JlZm9yZU9wZW4nLCdjbG9zZScsJ2NyZWF0ZWQnLCdvcGVuJywnc2VsZWN0J107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBbmd1bGFyIERyb3BEb3duQnV0dG9uIENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxidXR0b24gZWpzLWRyb3Bkb3duYnV0dG9uPkRyb3BEb3duQnV0dG9uPC9idXR0b24+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbZWpzLWRyb3Bkb3duYnV0dG9uXScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50ID48L25nLWNvbnRlbnQ+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkSXRlbXM6IG5ldyBDb250ZW50Q2hpbGQoRHJvcERvd25CdXR0b25JdGVtc0RpcmVjdGl2ZSlcbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZV0pXG5leHBvcnQgY2xhc3MgRHJvcERvd25CdXR0b25Db21wb25lbnQgZXh0ZW5kcyBEcm9wRG93bkJ1dHRvbiBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGFpbmVyQ29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRiZWZvcmVDbG9zZTogYW55O1xuXHRiZWZvcmVJdGVtUmVuZGVyOiBhbnk7XG5cdGJlZm9yZU9wZW46IGFueTtcblx0Y2xvc2U6IGFueTtcblx0Y3JlYXRlZDogYW55O1xuXHRvcGVuOiBhbnk7XG5cdHB1YmxpYyBzZWxlY3Q6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRJdGVtczogUXVlcnlMaXN0PERyb3BEb3duQnV0dG9uSXRlbXNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnaXRlbXMnXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5hZGRUd29XYXkuY2FsbCh0aGlzLCB0d29XYXlzKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dCAgPSBuZXcgQ29tcG9uZW50QmFzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nT25Jbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ0FmdGVyVmlld0luaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkRlc3Ryb3kodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWdPYmplY3RzWzBdLmluc3RhbmNlID0gdGhpcy5jaGlsZEl0ZW1zO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdBZnRlckNvbnRlbnRDaGVja2VkKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckV2ZW50czogKGV2ZW50TGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgcHVibGljIGFkZFR3b1dheTogKHByb3BMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuIl19