
type GrowlSeverity =
    "success"
    | "info"
    | "warn"
    | "error";


export class Growl {
    severity: GrowlSeverity;
    summary: string;
    detail: string;

    constructor(_severity: GrowlSeverity, _summary: string, _detail: string) {
        this.severity = _severity;
        this.summary = _summary;
        this.detail = _detail;
    }
}