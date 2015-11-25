var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { isPresent, StringWrapper } from 'angular2/src/facade/lang';
import { StringMapWrapper, ListWrapper } from 'angular2/src/facade/collection';
import { EventManagerPlugin } from 'angular2/core';
import { Injectable } from 'angular2/src/core/di';
var modifierKeys = ['alt', 'control', 'meta', 'shift'];
var modifierKeyGetters = {
    'alt': (event) => event.altKey,
    'control': (event) => event.ctrlKey,
    'meta': (event) => event.metaKey,
    'shift': (event) => event.shiftKey
};
export let KeyEventsPlugin = class extends EventManagerPlugin {
    constructor() {
        super();
    }
    supports(eventName) {
        return isPresent(KeyEventsPlugin.parseEventName(eventName));
    }
    addEventListener(element, eventName, handler) {
        var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
        var outsideHandler = KeyEventsPlugin.eventCallback(element, StringMapWrapper.get(parsedEvent, 'fullKey'), handler, this.manager.getZone());
        this.manager.getZone().runOutsideAngular(() => {
            DOM.on(element, StringMapWrapper.get(parsedEvent, 'domEventName'), outsideHandler);
        });
    }
    static parseEventName(eventName) {
        var parts = eventName.toLowerCase().split('.');
        var domEventName = parts.shift();
        if ((parts.length === 0) ||
            !(StringWrapper.equals(domEventName, 'keydown') ||
                StringWrapper.equals(domEventName, 'keyup'))) {
            return null;
        }
        var key = KeyEventsPlugin._normalizeKey(parts.pop());
        var fullKey = '';
        modifierKeys.forEach(modifierName => {
            if (ListWrapper.contains(parts, modifierName)) {
                ListWrapper.remove(parts, modifierName);
                fullKey += modifierName + '.';
            }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
            // returning null instead of throwing to let another plugin process the event
            return null;
        }
        var result = StringMapWrapper.create();
        StringMapWrapper.set(result, 'domEventName', domEventName);
        StringMapWrapper.set(result, 'fullKey', fullKey);
        return result;
    }
    static getEventFullKey(event) {
        var fullKey = '';
        var key = DOM.getEventKey(event);
        key = key.toLowerCase();
        if (StringWrapper.equals(key, ' ')) {
            key = 'space'; // for readability
        }
        else if (StringWrapper.equals(key, '.')) {
            key = 'dot'; // because '.' is used as a separator in event names
        }
        modifierKeys.forEach(modifierName => {
            if (modifierName != key) {
                var modifierGetter = StringMapWrapper.get(modifierKeyGetters, modifierName);
                if (modifierGetter(event)) {
                    fullKey += modifierName + '.';
                }
            }
        });
        fullKey += key;
        return fullKey;
    }
    static eventCallback(element, fullKey, handler, zone) {
        return (event) => {
            if (StringWrapper.equals(KeyEventsPlugin.getEventFullKey(event), fullKey)) {
                zone.run(() => handler(event));
            }
        };
    }
    /** @internal */
    static _normalizeKey(keyName) {
        // TODO: switch to a StringMap if the mapping grows too much
        switch (keyName) {
            case 'esc':
                return 'escape';
            default:
                return keyName;
        }
    }
};
KeyEventsPlugin = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], KeyEventsPlugin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2tleV9ldmVudHMudHMiXSwibmFtZXMiOlsiS2V5RXZlbnRzUGx1Z2luIiwiS2V5RXZlbnRzUGx1Z2luLmNvbnN0cnVjdG9yIiwiS2V5RXZlbnRzUGx1Z2luLnN1cHBvcnRzIiwiS2V5RXZlbnRzUGx1Z2luLmFkZEV2ZW50TGlzdGVuZXIiLCJLZXlFdmVudHNQbHVnaW4ucGFyc2VFdmVudE5hbWUiLCJLZXlFdmVudHNQbHVnaW4uZ2V0RXZlbnRGdWxsS2V5IiwiS2V5RXZlbnRzUGx1Z2luLmV2ZW50Q2FsbGJhY2siLCJLZXlFdmVudHNQbHVnaW4uX25vcm1hbGl6ZUtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7T0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLHVDQUF1QztPQUNsRCxFQUNMLFNBQVMsRUFFVCxhQUFhLEVBR2QsTUFBTSwwQkFBMEI7T0FDMUIsRUFBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckUsRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGVBQWU7T0FFekMsRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0I7QUFFL0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN2RCxJQUFJLGtCQUFrQixHQUF1RDtJQUMzRSxLQUFLLEVBQUUsQ0FBQyxLQUFvQixLQUFLLEtBQUssQ0FBQyxNQUFNO0lBQzdDLFNBQVMsRUFBRSxDQUFDLEtBQW9CLEtBQUssS0FBSyxDQUFDLE9BQU87SUFDbEQsTUFBTSxFQUFFLENBQUMsS0FBb0IsS0FBSyxLQUFLLENBQUMsT0FBTztJQUMvQyxPQUFPLEVBQUUsQ0FBQyxLQUFvQixLQUFLLEtBQUssQ0FBQyxRQUFRO0NBQ2xELENBQUM7QUFFRiwyQ0FDcUMsa0JBQWtCO0lBQ3JEQTtRQUFnQkMs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R0EsQ0FBQ0E7Z0JBQ2hDQSxDQUFDQTtZQUNIQSxDQUFDQTtRQUNIQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNIQSxPQUFPQSxJQUFJQSxHQUFHQSxDQUFDQTtRQUNmQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFREwsT0FBT0EsYUFBYUEsQ0FBQ0EsT0FBb0JBLEVBQUVBLE9BQVlBLEVBQUVBLE9BQTBCQSxFQUM5REEsSUFBWUE7UUFDL0JNLE1BQU1BLENBQUNBLENBQUNBLEtBQUtBO1lBQ1hBLEVBQUVBLENBQUNBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLGVBQWVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakNBLENBQUNBO1FBQ0hBLENBQUNBLENBQUNBO0lBQ0pBLENBQUNBO0lBRUROLGdCQUFnQkE7SUFDaEJBLE9BQU9BLGFBQWFBLENBQUNBLE9BQWVBO1FBQ2xDTyw0REFBNERBO1FBQzVEQSxNQUFNQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQkEsS0FBS0EsS0FBS0E7Z0JBQ1JBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBO1lBQ2xCQTtnQkFDRUEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDbkJBLENBQUNBO0lBQ0hBLENBQUNBO0FBQ0hQLENBQUNBO0FBMUZEO0lBQUMsVUFBVSxFQUFFOztvQkEwRlo7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7XG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgU3RyaW5nV3JhcHBlcixcbiAgUmVnRXhwV3JhcHBlcixcbiAgTnVtYmVyV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RXZlbnRNYW5hZ2VyUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5cbnZhciBtb2RpZmllcktleXMgPSBbJ2FsdCcsICdjb250cm9sJywgJ21ldGEnLCAnc2hpZnQnXTtcbnZhciBtb2RpZmllcktleUdldHRlcnM6IHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGJvb2xlYW59ID0ge1xuICAnYWx0JzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5hbHRLZXksXG4gICdjb250cm9sJzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5jdHJsS2V5LFxuICAnbWV0YSc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQubWV0YUtleSxcbiAgJ3NoaWZ0JzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5zaGlmdEtleVxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtleUV2ZW50c1BsdWdpbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XG5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KEtleUV2ZW50c1BsdWdpbi5wYXJzZUV2ZW50TmFtZShldmVudE5hbWUpKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiAoRXZlbnQ6IGFueSkgPT4gYW55KSB7XG4gICAgdmFyIHBhcnNlZEV2ZW50ID0gS2V5RXZlbnRzUGx1Z2luLnBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSk7XG5cbiAgICB2YXIgb3V0c2lkZUhhbmRsZXIgPSBLZXlFdmVudHNQbHVnaW4uZXZlbnRDYWxsYmFjayhcbiAgICAgICAgZWxlbWVudCwgU3RyaW5nTWFwV3JhcHBlci5nZXQocGFyc2VkRXZlbnQsICdmdWxsS2V5JyksIGhhbmRsZXIsIHRoaXMubWFuYWdlci5nZXRab25lKCkpO1xuXG4gICAgdGhpcy5tYW5hZ2VyLmdldFpvbmUoKS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBET00ub24oZWxlbWVudCwgU3RyaW5nTWFwV3JhcHBlci5nZXQocGFyc2VkRXZlbnQsICdkb21FdmVudE5hbWUnKSwgb3V0c2lkZUhhbmRsZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZTogc3RyaW5nKToge1trZXk6IHN0cmluZ106IHN0cmluZ30ge1xuICAgIHZhciBwYXJ0czogc3RyaW5nW10gPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnLicpO1xuXG4gICAgdmFyIGRvbUV2ZW50TmFtZSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKChwYXJ0cy5sZW5ndGggPT09IDApIHx8XG4gICAgICAgICEoU3RyaW5nV3JhcHBlci5lcXVhbHMoZG9tRXZlbnROYW1lLCAna2V5ZG93bicpIHx8XG4gICAgICAgICAgU3RyaW5nV3JhcHBlci5lcXVhbHMoZG9tRXZlbnROYW1lLCAna2V5dXAnKSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBrZXkgPSBLZXlFdmVudHNQbHVnaW4uX25vcm1hbGl6ZUtleShwYXJ0cy5wb3AoKSk7XG5cbiAgICB2YXIgZnVsbEtleSA9ICcnO1xuICAgIG1vZGlmaWVyS2V5cy5mb3JFYWNoKG1vZGlmaWVyTmFtZSA9PiB7XG4gICAgICBpZiAoTGlzdFdyYXBwZXIuY29udGFpbnMocGFydHMsIG1vZGlmaWVyTmFtZSkpIHtcbiAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlKHBhcnRzLCBtb2RpZmllck5hbWUpO1xuICAgICAgICBmdWxsS2V5ICs9IG1vZGlmaWVyTmFtZSArICcuJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmdWxsS2V5ICs9IGtleTtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggIT0gMCB8fCBrZXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyByZXR1cm5pbmcgbnVsbCBpbnN0ZWFkIG9mIHRocm93aW5nIHRvIGxldCBhbm90aGVyIHBsdWdpbiBwcm9jZXNzIHRoZSBldmVudFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBTdHJpbmdNYXBXcmFwcGVyLmNyZWF0ZSgpO1xuICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJlc3VsdCwgJ2RvbUV2ZW50TmFtZScsIGRvbUV2ZW50TmFtZSk7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5zZXQocmVzdWx0LCAnZnVsbEtleScsIGZ1bGxLZXkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0RXZlbnRGdWxsS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogc3RyaW5nIHtcbiAgICB2YXIgZnVsbEtleSA9ICcnO1xuICAgIHZhciBrZXkgPSBET00uZ2V0RXZlbnRLZXkoZXZlbnQpO1xuICAgIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChTdHJpbmdXcmFwcGVyLmVxdWFscyhrZXksICcgJykpIHtcbiAgICAgIGtleSA9ICdzcGFjZSc7ICAvLyBmb3IgcmVhZGFiaWxpdHlcbiAgICB9IGVsc2UgaWYgKFN0cmluZ1dyYXBwZXIuZXF1YWxzKGtleSwgJy4nKSkge1xuICAgICAga2V5ID0gJ2RvdCc7ICAvLyBiZWNhdXNlICcuJyBpcyB1c2VkIGFzIGEgc2VwYXJhdG9yIGluIGV2ZW50IG5hbWVzXG4gICAgfVxuICAgIG1vZGlmaWVyS2V5cy5mb3JFYWNoKG1vZGlmaWVyTmFtZSA9PiB7XG4gICAgICBpZiAobW9kaWZpZXJOYW1lICE9IGtleSkge1xuICAgICAgICB2YXIgbW9kaWZpZXJHZXR0ZXIgPSBTdHJpbmdNYXBXcmFwcGVyLmdldChtb2RpZmllcktleUdldHRlcnMsIG1vZGlmaWVyTmFtZSk7XG4gICAgICAgIGlmIChtb2RpZmllckdldHRlcihldmVudCkpIHtcbiAgICAgICAgICBmdWxsS2V5ICs9IG1vZGlmaWVyTmFtZSArICcuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bGxLZXkgKz0ga2V5O1xuICAgIHJldHVybiBmdWxsS2V5O1xuICB9XG5cbiAgc3RhdGljIGV2ZW50Q2FsbGJhY2soZWxlbWVudDogSFRNTEVsZW1lbnQsIGZ1bGxLZXk6IGFueSwgaGFuZGxlcjogKGU6IEV2ZW50KSA9PiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgIHpvbmU6IE5nWm9uZSk6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuZXF1YWxzKEtleUV2ZW50c1BsdWdpbi5nZXRFdmVudEZ1bGxLZXkoZXZlbnQpLCBmdWxsS2V5KSkge1xuICAgICAgICB6b25lLnJ1bigoKSA9PiBoYW5kbGVyKGV2ZW50KSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIF9ub3JtYWxpemVLZXkoa2V5TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBUT0RPOiBzd2l0Y2ggdG8gYSBTdHJpbmdNYXAgaWYgdGhlIG1hcHBpbmcgZ3Jvd3MgdG9vIG11Y2hcbiAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgIGNhc2UgJ2VzYyc6XG4gICAgICAgIHJldHVybiAnZXNjYXBlJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBrZXlOYW1lO1xuICAgIH1cbiAgfVxufVxuIl19