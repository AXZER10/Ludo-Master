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

#import "DiscordShare.h"
#import "EmailShare.h"
#import "FacebookStories.h"
#import "GenericShare.h"
#import "GooglePlusShare.h"
#import "InstagramShare.h"
#import "InstagramStories.h"
#import "MessengerShare.h"
#import "RNShare.h"
#import "RNShareActivityItemSource.h"
#import "RNShareUtils.h"
#import "SmsShare.h"
#import "TelegramShare.h"
#import "ViberShare.h"
#import "WhatsAppShare.h"

FOUNDATION_EXPORT double RNShareVersionNumber;
FOUNDATION_EXPORT const unsigned char RNShareVersionString[];

