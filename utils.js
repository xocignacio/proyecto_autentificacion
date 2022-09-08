import {fileURLToPath} from 'url'
import { dirname } from 'path'

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));  /// utilizo en session router

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;