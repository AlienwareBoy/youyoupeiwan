"use strict";
Page({
    data: {
        imgUrls: [
            'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        });
    },
    closeMask: function () {
        this.setData({
            isSuccess: false
        });
    },
    tobuy: function () {
        this.setData({
            isSuccess: true
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1PdmVydmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXRmb3JtT3ZlcnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRTtZQUNQLGlFQUFpRTtZQUNqRSxpRUFBaUU7WUFDakUsaUVBQWlFO1NBQ2xFO1FBQ0QsYUFBYSxFQUFFLEtBQUs7UUFDcEIsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxjQUFjO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBpbWdVcmxzOiBbXHJcbiAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1MTMzNDc4Ny0yMWU2YmQzYWIxMzU/dz02NDAnLFxyXG4gICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTEyMTQwMTItODRmOTVlMDYwZGVlP3c9NjQwJyxcclxuICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTUxNDQ2NTkxLTE0Mjg3NWE5MDFhMT93PTY0MCdcclxuICAgIF0sXHJcbiAgICBpbmRpY2F0b3JEb3RzOiBmYWxzZSxcclxuICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgIGludGVydmFsOiA1MDAwLFxyXG4gICAgZHVyYXRpb246IDEwMDBcclxuICB9LFxyXG4gIC8v5LqL5Lu25aSE55CG5Ye95pWwXHJcbiAgYmluZFZpZXdUYXAoKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIGNsb3NlTWFzaygpIHtcclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICBpc1N1Y2Nlc3M6IGZhbHNlXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgdG9idXkoKSB7XHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgaXNTdWNjZXNzOiB0cnVlXHJcbiAgICB9KVxyXG4gIH1cclxufSlcclxuIl19