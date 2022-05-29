
from sound import Sound


def forceIncreaseVolume(amount):
    try:
        print("Sound muted    | %s" % str(Sound.is_muted()))
        print("----------------------")
        if ((not Sound.is_muted())):
            Sound.mute()
            Sound.volume_set(amount)
        print("Current volume | %s" % str(Sound.current_volume()))
    except:
        print("An exception occurred")


forceIncreaseVolume(60)
