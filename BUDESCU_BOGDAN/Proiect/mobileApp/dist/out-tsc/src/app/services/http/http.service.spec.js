import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
describe('HttpService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(HttpService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=http.service.spec.js.map