def stats_data(request):
    statsData = []

    users = User.objects.all() 
    logs = Log.objects.all()

    personal_values=[]
    
    for user in users:
        filtered_logs = logs.filter(killer=user.username).filter(surrender=False)
        personal_values.append({user.username: filtered_logs.count()})

    statsData.append({
        "title": "Lizenz zum Töten",
        "type": "bar",
        "unit": "Kills",
        "personal_values": personal_values,
        "max_value": max([killer.values()[0] for killer in personal_values])
    })


    personal_values=[]
    
    for user in users:
        filtered_logs = logs.filter(victim=user.username).filter(surrender=False)
        personal_values.append({user.username: filtered_logs.count()})
        
    statsData.append({
        "title": "Tot, aber beschenkt",
        "type": "bar",
        "unit": "Tode",
        "personal_values":personal_values,
        "max_value": max([victim.values()[0] for victim in personal_values])
    })
    
    personal_values=[]
    
    for user in users:
        filtered_logs = logs.filter(killer=user.username).filter(surrender=True)
        personal_values.append({user.username: filtered_logs.count()})
        
    statsData.append({
        "title": "Aufgaben mag ich (nicht)",
        "type": "bar",
        "unit": "Aufgaben",
        "personal_values":personal_values,
        "max_value": max([surrenderer.values()[0] for surrenderer in personal_values])
    })
    
    personal_values=[]
    
    for user in users:
        filtered_logs = logs.filter(victim=user.username).filter(surrender=True)
        personal_values.append({user.username: filtered_logs.count()})
        
    statsData.append({
        "title": "Unerreichbar",
        "type": "bar",
        "unit": "Blocks",
        "personal_values":personal_values,
        "max_value": max([blocker.values()[0] for blocker in personal_values])
    })


    personal_values=[]
    
    for user in users:
        filtered_logs = logs.filter(killer=user.username).filter(surrender=False)
        distance=0
        for e in filtered_logs:
            distance+=e.distance
        personal_values.append({user.username: distance})
        
    statsData.append({
        "title": "Weltenbummler*in",
        "type": "bar",
        "unit": "km",
        "personal_values":personal_values,
        "max_value": max([distancer.values()[0] for distancer in personal_values])
    })
    
    personal_values=[]
    
    for user in users:
        kills = logs.filter(killer=user.username).filter(surrender=False)
        deaths = logs.filter(victim=user.username).filter(surrender=False)
        surrenders = logs.filter(killer=user.username).filter(surrender=True)
        blocks = logs.filter(victim=user.username).filter(surrender=True)
        overall = kills-deaths-surrenders+blocks
        personal_values.append({user.username: overall})
        
    statsData.append({
        "title": "Geben ist seliger als nehmen",
        "type": "bar",
        "unit": "Punkte",
        "personal_values":personal_values,
        "max_value": max([overall.values()[0] for overall in personal_values]),
        "min_value": min([overall.values()[0] for overall in personal_values])
        
    })

    return Response(statsData)
