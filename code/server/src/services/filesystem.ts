import { getLogger } from '@ouestware/node-logger';
import fs from 'fs/promises';
import { globby } from 'globby';
import { ReadStream, createReadStream, existsSync, readFileSync } from 'node:fs';
import path from 'path';
import readline from 'readline';
import { finished } from 'stream/promises';
import { singleton } from 'tsyringe';

import config from '../config';

@singleton()
export class FileSystem {
  /**
   * Logger
   */
  private log = getLogger('FileSystem');

  /**
   * Root path where to find/store files
   */
  private storagePath = config.server.data_folder;

  /**
   * Default constructor.
   */
  constructor() {
    this.log.info('FileSystem intialization');
  }

  /**
   * Remove a file by its path.
   */
  async delete(storageRelativePath: string): Promise<void> {
    const filePath = path.join(this.storagePath, storageRelativePath);
    // force: true is to not throw an error if file doesn't exist
    await fs.rm(filePath, { force: true, recursive: true });
  }

  /**
   * Create folder in the storage path.
   */
  async mkdir(storageRelativePath: string): Promise<void> {
    const filePath = path.join(this.storagePath, storageRelativePath);
    await fs.mkdir(filePath, { recursive: true });
  }

  /**
   * Read a file from the storage path by stream.
   */
  streamFile(storageRelativePath: string): ReadStream {
    const filePath = path.join(this.storagePath, storageRelativePath);
    return createReadStream(filePath);
  }

  /**
   * Read a file from the storage path.
   */
  readFile(storageRelativePath: string, encoding: BufferEncoding = 'utf-8') {
    const filePath = path.join(this.storagePath, storageRelativePath);
    return readFileSync(filePath, { encoding });
  }
  /**
   * Test file exitence
   */
  fileExists(storageRelativePath: string) {
    const filePath = path.join(this.storagePath, storageRelativePath);
    return existsSync(filePath);
  }

  /**
   * Return the first line of a file.
   */
  async readFirstLine(storageRelativePath: string): Promise<string> {
    const stream = this.streamFile(storageRelativePath);
    const reader = readline.createInterface({ input: stream });
    const line = await new Promise<string>((resolve, reject) => {
      reader.on('line', (line) => {
        reader.close();
        resolve(line);
      });
      reader.on('error', (err: Error) => reject(err));
    });
    stream.close();
    return line;
  }

  /**
   * List files of a folder.
   */
  async listFiles(storageRelativePath: string, glob = '*'): Promise<string[]> {
    const filePath = path.join(this.storagePath, storageRelativePath);
    const files = await globby(`${filePath}/${glob}`, { onlyFiles: true });
    return files.map((f) => f.replace(this.storagePath, ''));
  }

  /**
   * Wait a stream to finished
   */
  async streamFinished(
    stream: NodeJS.ReadableStream | NodeJS.WritableStream | NodeJS.ReadWriteStream,
  ) {
    return finished(stream);
  }
}
