#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "EXSplashScreenModule.h"
#import "EXSplashScreenService.h"
#import "EXSplashScreenViewController.h"
#import "EXSplashScreenViewNativeProvider.h"
#import "EXSplashScreenViewProvider.h"

FOUNDATION_EXPORT double EXSplashScreenVersionNumber;
FOUNDATION_EXPORT const unsigned char EXSplashScreenVersionString[];

