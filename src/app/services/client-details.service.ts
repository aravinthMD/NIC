import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClientDetailsService {
    private clientId: string;

    setClientId(id: string) {
        this.clientId = id;
    }

    getClientId() {
        return this.clientId;
    }
}
