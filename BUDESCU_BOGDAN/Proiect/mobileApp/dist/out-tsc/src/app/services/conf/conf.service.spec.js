import { TestBed } from '@angular/core/testing';
import { ConfService } from './conf.service';
describe('ConfService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ConfService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=conf.service.spec.js.map