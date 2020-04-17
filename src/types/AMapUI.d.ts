
declare namespace AMapUI {

    export interface PathSimplifierOptions {
        map: AMap.Map
        zIndex?: number
        data?: Array<any>
        getPath?: Function
        getZIndex?: Function
        getHoverTitle?: Function
        autoSetFitView?: boolean
        clickToSelectPath?: boolean
        onTopWhenSelected?: boolean
        renderOptions?: object
        // renderConstructor?: 
    }

    export class PathSimplifier {
        constructor(opt: PathSimplifierOptions)

        supportCanvas: boolean

        public getZIndexOfPath(pathIndex: number): number
        public setZIndexOfPath(pathIndex: number, zIndex: number): void
        public toggleTopOfPath(pathIndex: number, isTop: boolean): void
        public getPathData(pathIndex: number): object
        public getSelectedPathData(): object | null
        public getSelectedPathIndex(): number
        public isSelectedPathIndex(pathIndex: number): boolean
        public setSelectedPathIndex(pathIndex: number): void
        public render(): void
        public setData(data: Array<any>): void
        public setFitView(pathIndex: number): void
        public on(eventName: String, handler: Function): void
        public off(eventname: String, handler: Function): void
        public hide(): void
        public show(): void
        public isHidden(): boolean
    }
    
    export function load(name: Array<string>, callback: Function): void
}