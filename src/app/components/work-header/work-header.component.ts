import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/interfaces/card.inteface';

@Component({
    selector: 'app-work-header',
    templateUrl: './work-header.component.html',
    styleUrls: ['./work-header.component.scss'],
})
export class WorkHeaderComponent implements OnInit {
    @Input()
    arrayList: Card[];

    @Input()
    isNested: boolean = false;

    @Input()
    title: string = 'Novo Treino';

    @Input()
    editable: boolean = false;

    @Input()
    noContent: boolean = false;

    @Input()
    search: boolean = true;

    @Input()
    backUrl: string = '#';

    @Output()
    result: EventEmitter<Card[]> = new EventEmitter<Card[]>();

    @Output()
    editValue: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    searchHints: EventEmitter<string> = new EventEmitter<string>();

    constructor(private router: Router) {}

    ngOnInit() {
        if (this.editable) {
        }
    }

    titleChanged(event) {
        this.editValue.emit(event.target.value);
    }

    // handleChange(event: any) {
    //     const searchTerm = event.target.value;
    //     if (searchTerm && searchTerm.trim() !== '') {
    //         const filteredResults = this.arrayList.filter((card) => {
    //             return (
    //                 card.title
    //                     .toLowerCase()
    //                     .indexOf(searchTerm.toLowerCase()) !== -1
    //             );
    //         });
    //         this.result.emit(filteredResults);
    //     } else {
    //         this.result.emit(this.arrayList);
    //     }
    // }
    handleChange(event: any) {
        const searchTerm = event.target.value;
        if (searchTerm && searchTerm.trim() !== '') {
            const filteredResults = this.arrayList.filter((card) => {
                return (
                    card.title
                        .toLowerCase()
                        .indexOf(searchTerm.toLowerCase()) !== -1
                );
            });
            this.result.emit(filteredResults);

            // Verificar a string de pesquisa e redirecionar se necessário
            if (
                searchTerm.toLowerCase() === 'dicas' ||
                searchTerm.toLowerCase() === 'dicas de treino' ||
                searchTerm.toLowerCase() === 'dicas treino'
            ) {
                this.router.navigate(['tabs/home/hints']);
            }
            // Adicione outras palavras-chave e redirecionamentos conforme necessário
        } else {
            this.result.emit(this.arrayList);
        }
    }
}
