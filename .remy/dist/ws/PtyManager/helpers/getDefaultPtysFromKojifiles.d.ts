export interface DefaultPty {
    name: string;
    cwd: string;
    command: string;
}
export declare function getDefaultPtysFromKojifiles(): Promise<DefaultPty[]>;
