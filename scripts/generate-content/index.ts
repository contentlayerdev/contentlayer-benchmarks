import path from "path";

import { initDir } from "./utils/dir-utils";
import { generateFile } from "./utils/content-utils";

const contentDir = path.join(process.cwd(), "../../content");
initDir(contentDir);

const iterator = [...Array(1000)];
iterator.map(() => generateFile(contentDir));
