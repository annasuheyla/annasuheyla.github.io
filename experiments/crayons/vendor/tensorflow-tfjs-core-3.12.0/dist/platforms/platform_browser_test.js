/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { BROWSER_ENVS, describeWithFlags } from '../jasmine_util';
import { PlatformBrowser } from './platform_browser';
describeWithFlags('PlatformBrowser', BROWSER_ENVS, async () => {
    it('fetch calls window.fetch', async () => {
        const response = new Response();
        spyOn(self, 'fetch').and.returnValue(response);
        const platform = new PlatformBrowser();
        await platform.fetch('test/url', { method: 'GET' });
        expect(self.fetch).toHaveBeenCalledWith('test/url', { method: 'GET' });
    });
    it('now should use performance.now', async () => {
        const platform = new PlatformBrowser();
        const ms = 1234567;
        spyOn(performance, 'now').and.returnValue(ms);
        expect(platform.now()).toEqual(ms);
    });
    it('encodeUTF8 single string', () => {
        const platform = new PlatformBrowser();
        const bytes = platform.encode('hello', 'utf-8');
        expect(bytes.length).toBe(5);
        expect(bytes).toEqual(new Uint8Array([104, 101, 108, 108, 111]));
    });
    it('encodeUTF8 two strings delimited', () => {
        const platform = new PlatformBrowser();
        const bytes = platform.encode('hello\x00world', 'utf-8');
        expect(bytes.length).toBe(11);
        expect(bytes).toEqual(new Uint8Array([104, 101, 108, 108, 111, 0, 119, 111, 114, 108, 100]));
    });
    it('encodeUTF8 cyrillic', () => {
        const platform = new PlatformBrowser();
        const bytes = platform.encode('Здраво', 'utf-8');
        expect(bytes.length).toBe(12);
        expect(bytes).toEqual(new Uint8Array([208, 151, 208, 180, 209, 128, 208, 176, 208, 178, 208, 190]));
    });
    it('decode single string', () => {
        const platform = new PlatformBrowser();
        const s = platform.decode(new Uint8Array([104, 101, 108, 108, 111]), 'utf-8');
        expect(s.length).toBe(5);
        expect(s).toEqual('hello');
    });
    it('decode two strings delimited', () => {
        const platform = new PlatformBrowser();
        const s = platform.decode(new Uint8Array([104, 101, 108, 108, 111, 0, 119, 111, 114, 108, 100]), 'utf-8');
        expect(s.length).toBe(11);
        expect(s).toEqual('hello\x00world');
    });
    it('decode cyrillic', () => {
        const platform = new PlatformBrowser();
        const s = platform.decode(new Uint8Array([208, 151, 208, 180, 209, 128, 208, 176, 208, 178, 208, 190]), 'utf-8');
        expect(s.length).toBe(6);
        expect(s).toEqual('Здраво');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fYnJvd3Nlcl90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1jb3JlL3NyYy9wbGF0Zm9ybXMvcGxhdGZvcm1fYnJvd3Nlcl90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFbkQsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQzVELEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN4QyxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBRXZDLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVsRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzlDLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFFdkMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ25CLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtRQUMxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FDakIsSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtRQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxVQUFVLENBQ2hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO1FBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLEdBQ0gsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1FBQ3RDLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDckIsSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFDckUsT0FBTyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDckIsSUFBSSxVQUFVLENBQ1YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQ2pFLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0JST1dTRVJfRU5WUywgZGVzY3JpYmVXaXRoRmxhZ3N9IGZyb20gJy4uL2phc21pbmVfdXRpbCc7XG5cbmltcG9ydCB7UGxhdGZvcm1Ccm93c2VyfSBmcm9tICcuL3BsYXRmb3JtX2Jyb3dzZXInO1xuXG5kZXNjcmliZVdpdGhGbGFncygnUGxhdGZvcm1Ccm93c2VyJywgQlJPV1NFUl9FTlZTLCBhc3luYyAoKSA9PiB7XG4gIGl0KCdmZXRjaCBjYWxscyB3aW5kb3cuZmV0Y2gnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICBzcHlPbihzZWxmLCAnZmV0Y2gnKS5hbmQucmV0dXJuVmFsdWUocmVzcG9uc2UpO1xuICAgIGNvbnN0IHBsYXRmb3JtID0gbmV3IFBsYXRmb3JtQnJvd3NlcigpO1xuXG4gICAgYXdhaXQgcGxhdGZvcm0uZmV0Y2goJ3Rlc3QvdXJsJywge21ldGhvZDogJ0dFVCd9KTtcblxuICAgIGV4cGVjdChzZWxmLmZldGNoKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndGVzdC91cmwnLCB7bWV0aG9kOiAnR0VUJ30pO1xuICB9KTtcblxuICBpdCgnbm93IHNob3VsZCB1c2UgcGVyZm9ybWFuY2Uubm93JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHBsYXRmb3JtID0gbmV3IFBsYXRmb3JtQnJvd3NlcigpO1xuXG4gICAgY29uc3QgbXMgPSAxMjM0NTY3O1xuICAgIHNweU9uKHBlcmZvcm1hbmNlLCAnbm93JykuYW5kLnJldHVyblZhbHVlKG1zKTtcbiAgICBleHBlY3QocGxhdGZvcm0ubm93KCkpLnRvRXF1YWwobXMpO1xuICB9KTtcblxuICBpdCgnZW5jb2RlVVRGOCBzaW5nbGUgc3RyaW5nJywgKCkgPT4ge1xuICAgIGNvbnN0IHBsYXRmb3JtID0gbmV3IFBsYXRmb3JtQnJvd3NlcigpO1xuICAgIGNvbnN0IGJ5dGVzID0gcGxhdGZvcm0uZW5jb2RlKCdoZWxsbycsICd1dGYtOCcpO1xuICAgIGV4cGVjdChieXRlcy5sZW5ndGgpLnRvQmUoNSk7XG4gICAgZXhwZWN0KGJ5dGVzKS50b0VxdWFsKG5ldyBVaW50OEFycmF5KFsxMDQsIDEwMSwgMTA4LCAxMDgsIDExMV0pKTtcbiAgfSk7XG5cbiAgaXQoJ2VuY29kZVVURjggdHdvIHN0cmluZ3MgZGVsaW1pdGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IHBsYXRmb3JtID0gbmV3IFBsYXRmb3JtQnJvd3NlcigpO1xuICAgIGNvbnN0IGJ5dGVzID0gcGxhdGZvcm0uZW5jb2RlKCdoZWxsb1xceDAwd29ybGQnLCAndXRmLTgnKTtcbiAgICBleHBlY3QoYnl0ZXMubGVuZ3RoKS50b0JlKDExKTtcbiAgICBleHBlY3QoYnl0ZXMpLnRvRXF1YWwoXG4gICAgICAgIG5ldyBVaW50OEFycmF5KFsxMDQsIDEwMSwgMTA4LCAxMDgsIDExMSwgMCwgMTE5LCAxMTEsIDExNCwgMTA4LCAxMDBdKSk7XG4gIH0pO1xuXG4gIGl0KCdlbmNvZGVVVEY4IGN5cmlsbGljJywgKCkgPT4ge1xuICAgIGNvbnN0IHBsYXRmb3JtID0gbmV3IFBsYXRmb3JtQnJvd3NlcigpO1xuICAgIGNvbnN0IGJ5dGVzID0gcGxhdGZvcm0uZW5jb2RlKCfQl9C00YDQsNCy0L4nLCAndXRmLTgnKTtcbiAgICBleHBlY3QoYnl0ZXMubGVuZ3RoKS50b0JlKDEyKTtcbiAgICBleHBlY3QoYnl0ZXMpLnRvRXF1YWwobmV3IFVpbnQ4QXJyYXkoXG4gICAgICAgIFsyMDgsIDE1MSwgMjA4LCAxODAsIDIwOSwgMTI4LCAyMDgsIDE3NiwgMjA4LCAxNzgsIDIwOCwgMTkwXSkpO1xuICB9KTtcblxuICBpdCgnZGVjb2RlIHNpbmdsZSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgY29uc3QgcGxhdGZvcm0gPSBuZXcgUGxhdGZvcm1Ccm93c2VyKCk7XG4gICAgY29uc3QgcyA9XG4gICAgICAgIHBsYXRmb3JtLmRlY29kZShuZXcgVWludDhBcnJheShbMTA0LCAxMDEsIDEwOCwgMTA4LCAxMTFdKSwgJ3V0Zi04Jyk7XG4gICAgZXhwZWN0KHMubGVuZ3RoKS50b0JlKDUpO1xuICAgIGV4cGVjdChzKS50b0VxdWFsKCdoZWxsbycpO1xuICB9KTtcblxuICBpdCgnZGVjb2RlIHR3byBzdHJpbmdzIGRlbGltaXRlZCcsICgpID0+IHtcbiAgICBjb25zdCBwbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybUJyb3dzZXIoKTtcbiAgICBjb25zdCBzID0gcGxhdGZvcm0uZGVjb2RlKFxuICAgICAgICBuZXcgVWludDhBcnJheShbMTA0LCAxMDEsIDEwOCwgMTA4LCAxMTEsIDAsIDExOSwgMTExLCAxMTQsIDEwOCwgMTAwXSksXG4gICAgICAgICd1dGYtOCcpO1xuICAgIGV4cGVjdChzLmxlbmd0aCkudG9CZSgxMSk7XG4gICAgZXhwZWN0KHMpLnRvRXF1YWwoJ2hlbGxvXFx4MDB3b3JsZCcpO1xuICB9KTtcblxuICBpdCgnZGVjb2RlIGN5cmlsbGljJywgKCkgPT4ge1xuICAgIGNvbnN0IHBsYXRmb3JtID0gbmV3IFBsYXRmb3JtQnJvd3NlcigpO1xuICAgIGNvbnN0IHMgPSBwbGF0Zm9ybS5kZWNvZGUoXG4gICAgICAgIG5ldyBVaW50OEFycmF5KFxuICAgICAgICAgICAgWzIwOCwgMTUxLCAyMDgsIDE4MCwgMjA5LCAxMjgsIDIwOCwgMTc2LCAyMDgsIDE3OCwgMjA4LCAxOTBdKSxcbiAgICAgICAgJ3V0Zi04Jyk7XG4gICAgZXhwZWN0KHMubGVuZ3RoKS50b0JlKDYpO1xuICAgIGV4cGVjdChzKS50b0VxdWFsKCfQl9C00YDQsNCy0L4nKTtcbiAgfSk7XG59KTtcbiJdfQ==