import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { SplitButtonItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
export const inputs = ['animationSettings', 'closeActionEvents', 'content', 'createPopupOnClick', 'cssClass', 'disabled', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'iconCss', 'iconPosition', 'itemTemplate', 'items', 'locale', 'popupWidth', 'target'];
export const outputs = ['beforeClose', 'beforeItemRender', 'beforeOpen', 'click', 'close', 'created', 'open', 'select'];
export const twoWays = [];
/**
 * Represents the Angular SplitButton Component.
 * ```html
 * <ejs-splitbutton content='Split Button'></ejs-splitbutton>
 * ```
 */
let SplitButtonComponent = class SplitButtonComponent extends SplitButton {
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
SplitButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SplitButtonComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SplitButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SplitButtonComponent, selector: "ejs-splitbutton", inputs: { animationSettings: "animationSettings", closeActionEvents: "closeActionEvents", content: "content", createPopupOnClick: "createPopupOnClick", cssClass: "cssClass", disabled: "disabled", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", iconCss: "iconCss", iconPosition: "iconPosition", itemTemplate: "itemTemplate", items: "items", locale: "locale", popupWidth: "popupWidth", target: "target" }, outputs: { beforeClose: "beforeClose", beforeItemRender: "beforeItemRender", beforeOpen: "beforeOpen", click: "click", close: "close", created: "created", open: "open", select: "select" }, queries: [{ propertyName: "childItems", first: true, predicate: SplitButtonItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SplitButtonComponent = __decorate([
    ComponentMixins([ComponentBase])
], SplitButtonComponent);
export { SplitButtonComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SplitButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-splitbutton',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(SplitButtonItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRidXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NwbGl0LWJ1dHRvbi9zcGxpdGJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFELHVCQUF1QixFQUE0QixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQXVELFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFOUQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsbUJBQW1CLEVBQUMsbUJBQW1CLEVBQUMsU0FBUyxFQUFDLG9CQUFvQixFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMscUJBQXFCLEVBQUMsbUJBQW1CLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxjQUFjLEVBQUMsY0FBYyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BRLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLGFBQWEsRUFBQyxrQkFBa0IsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFFcEM7Ozs7O0dBS0c7SUFZVSxvQkFBb0IsU0FBcEIsb0JBQXFCLFNBQVEsV0FBVztJQWNqRCxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0I7UUFDdEksS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRm5JLFNBQUksR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSTlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FJSixDQUFBO2lIQTVDWSxvQkFBb0I7cUdBQXBCLG9CQUFvQiw0dUJBSkkseUJBQXlCLHVFQUhoRCw0QkFBNEI7QUFPN0Isb0JBQW9CO0lBRGhDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLG9CQUFvQixDQTRDaEM7U0E1Q1ksb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBWGhDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsVUFBVSxFQUFFLElBQUksWUFBWSxDQUFDLHlCQUF5QixDQUFDO3FCQUMxRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBDb21wb25lbnRNaXhpbnMsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFNwbGl0QnV0dG9uIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXNwbGl0YnV0dG9ucyc7XG5cbmltcG9ydCB7IFNwbGl0QnV0dG9uSXRlbXNEaXJlY3RpdmUgfSBmcm9tICcuL2l0ZW1zLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhbmltYXRpb25TZXR0aW5ncycsJ2Nsb3NlQWN0aW9uRXZlbnRzJywnY29udGVudCcsJ2NyZWF0ZVBvcHVwT25DbGljaycsJ2Nzc0NsYXNzJywnZGlzYWJsZWQnLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdpY29uQ3NzJywnaWNvblBvc2l0aW9uJywnaXRlbVRlbXBsYXRlJywnaXRlbXMnLCdsb2NhbGUnLCdwb3B1cFdpZHRoJywndGFyZ2V0J107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JlZm9yZUNsb3NlJywnYmVmb3JlSXRlbVJlbmRlcicsJ2JlZm9yZU9wZW4nLCdjbGljaycsJ2Nsb3NlJywnY3JlYXRlZCcsJ29wZW4nLCdzZWxlY3QnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFtdO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEFuZ3VsYXIgU3BsaXRCdXR0b24gQ29tcG9uZW50LlxuICogYGBgaHRtbFxuICogPGVqcy1zcGxpdGJ1dHRvbiBjb250ZW50PSdTcGxpdCBCdXR0b24nPjwvZWpzLXNwbGl0YnV0dG9uPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLXNwbGl0YnV0dG9uJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQgPjwvbmctY29udGVudD5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRJdGVtczogbmV3IENvbnRlbnRDaGlsZChTcGxpdEJ1dHRvbkl0ZW1zRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBTcGxpdEJ1dHRvbkNvbXBvbmVudCBleHRlbmRzIFNwbGl0QnV0dG9uIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBjb250YWluZXJDb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGJlZm9yZUNsb3NlOiBhbnk7XG5cdGJlZm9yZUl0ZW1SZW5kZXI6IGFueTtcblx0YmVmb3JlT3BlbjogYW55O1xuXHRjbGljazogYW55O1xuXHRjbG9zZTogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdG9wZW46IGFueTtcblx0cHVibGljIHNlbGVjdDogYW55O1xuICAgIHB1YmxpYyBjaGlsZEl0ZW1zOiBRdWVyeUxpc3Q8U3BsaXRCdXR0b25JdGVtc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydpdGVtcyddO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkSXRlbXM7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=