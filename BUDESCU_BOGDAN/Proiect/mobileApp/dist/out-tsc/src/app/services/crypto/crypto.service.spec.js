import { TestBed } from '@angular/core/testing';
import { CryptoService } from './crypto.service';
describe('CryptoService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CryptoService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=crypto.service.spec.js.map