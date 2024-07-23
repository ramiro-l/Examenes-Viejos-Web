import { GITHUB_VIWER_URL } from "./const";

export function githubPdfViewer(github_url: string): string {
    const url = new URL(github_url);
    return GITHUB_VIWER_URL + url.pathname;
}
