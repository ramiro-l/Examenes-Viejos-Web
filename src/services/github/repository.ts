import { GITHUB_API_URL, GITHUB_WEB_URL } from "./constants";
import type { GithubRepositoryContent } from "./types";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class GithubRepository {
    readonly web_url: string;
    protected git_url: string;
    protected owner: string;
    protected repository: string;
    protected content?: GithubRepositoryContent[];
    protected path: string;

    constructor(owner: string, repository: string, path: string = "") {
        this.owner = owner;
        this.path = path;
        this.repository = repository;
        this.web_url = `${GITHUB_WEB_URL}/${owner}/${repository}`;
        this.git_url = `${GITHUB_API_URL}/${owner}/${repository}`;
    }

    async fetchContent() {
        try {
            const req_url = this.git_url + "/contents/" + this.path;
            const response = await axios.get(req_url, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
                },
            });
            this.content = response.data;
        } catch (error) {
            // FIXME: Usar excepciones en vez de console.error
            console.error("Error fetching GitHub repository contents:", error);
        }
    }
}
/* This function parser the name of the github repository url.
 *  to owner and repository.
 *  Example 1:
 *  'https://api.github.com/repos/ExamenesViejos-FaMAF-Computacion/ExamenesViejos_MatematicaDiscreta2_FaMAF/...'
 *  {
 *   owner: 'ExamenesViejos-FaMAF-Computacion',
 *   repository: 'ExamenesViejos_MatematicaDiscreta2_FaMA',
 *  }
 *  Example 2:
 *  'https://github.com/ExamenesViejos-FaMAF-Computacion/ExamenesViejos_MatematicaDiscreta2_FaMAF/...'
 *  {
 *   owner: 'ExamenesViejos-FaMAF-Computacion',
 *   repository: 'ExamenesViejos_MatematicaDiscreta2_FaMA',
 *  }
 *  Note: The url can be from the api or the web.
 */
export function parserGithubRepositoryUrlToOwnerAndRepo(name: string): {
    owner: string;
    repository: string;
} {
    const url = new URL(name);
    let index_owner = 1;
    if (url.hostname === "api.github.com") {
        index_owner = 2;
    }
    const path = url.pathname.split("/");
    const owner = path[index_owner];
    const repository = path[index_owner + 1];

    return { owner, repository };
}
