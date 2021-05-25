import { Injectable } from '@angular/core';
import { OpenDialogSyncOptions } from 'electron';
import { Movie } from '@models';
import { ElectronService } from './electron.service';

@Injectable()
export class SystemService extends ElectronService {

    private readonly DIALOG_OPTIONS: OpenDialogSyncOptions = {
        title: 'Choose folder(s)',
        properties: [
            'openDirectory',
            'multiSelections'
        ]
    };

    constructor() {
        super();
    }

    public showItemInFolder(movie: Movie): void {
        console.log('showItemInFolder', movie);
        this.shell.showItemInFolder(
            this.path.join(movie.dir, movie.fileBase)
        );
    }

    public beep(): void {
        this.shell.beep();
    }

    public showOpenDialog(): string[] {
        return this.dialog.showOpenDialogSync(this.DIALOG_OPTIONS);
    }

    public play(movie: Movie): void {
        console.log(this.path.join(movie.dir, movie.fileBase), movie);
        this.shell.openPath(
            // '/Users/amigamac/Movies/FILMS/À la poursuite du diamant vert (1984)/poster.jpg'
            this.path.join(movie.dir, movie.fileBase)
        )
        .then((data) => {
            console.log(data);
        });
    }

    public openExternalLink(link: string): void {
        this.shell.openExternal(link);
    }
}
