import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Shared components/directives/pipes
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PIPES } from './pipes';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        IonicModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        RouterModule,
        IonicModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ],
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ]
})
export class SharedModule {}
