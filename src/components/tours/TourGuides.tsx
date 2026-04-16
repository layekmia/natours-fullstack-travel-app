import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Guide } from '@/types';
import { Award, Calendar, Mail, MapPin, Shield, Star, Users } from 'lucide-react';

interface TourGuidesProps {
  guides: Guide[];
}

const getRoleBadgeColor = (role: string) => {
  const colors: Record<string, string> = {
    'lead-guide': 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    'guide': 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    'user': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700',
    'admin': 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  };
  return colors[role] || colors['user'];
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'lead-guide':
      return <Award className="h-3.5 w-3.5" />;
    case 'guide':
      return <MapPin className="h-3.5 w-3.5" />;
    default:
      return <Users className="h-3.5 w-3.5" />;
  }
};

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case 'lead-guide':
      return 'Lead Guide';
    case 'guide':
      return 'Tour Guide';
    default:
      return role;
  }
};

export const TourGuides = ({ guides }: TourGuidesProps) => {
  if (!guides || guides.length === 0) {
    return null;
  }

  const leadGuide = guides.find(g => g.role === 'lead-guide');
  const regularGuides = guides.filter(g => g.role !== 'lead-guide');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
            <Users className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Tour Guides
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-7">
          Meet our experienced local guides who will make your journey unforgettable
        </p>
      </div>

      <div className="p-6">
        {/* Lead Guide Section */}
        {leadGuide && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Lead Guide
              </h3>
            </div>
            
            <Card className="overflow-hidden border-0 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-gray-900 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 blur-lg opacity-30" />
                    <Avatar className="h-24 w-24 ring-4 ring-amber-200 dark:ring-amber-800">
                      <AvatarImage src={leadGuide.photo} alt={leadGuide.name} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white">
                        {leadGuide.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                      <Badge className={cn("gap-1 shadow-md", getRoleBadgeColor(leadGuide.role))}>
                        {getRoleIcon(leadGuide.role)}
                        <span className="text-xs">{getRoleDisplayName(leadGuide.role)}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {leadGuide.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Expert local guide with years of experience in leading adventure tours
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span>4.9 (128 reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>5+ years experience</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>Local expert</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge variant="outline" className="gap-1.5 bg-white dark:bg-gray-900">
                        <Mail className="h-3 w-3" />
                        {leadGuide.email}
                      </Badge>
                      <Badge variant="outline" className="gap-1.5 bg-white dark:bg-gray-900">
                        <Shield className="h-3 w-3" />
                        Certified Guide
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Regular Guides Section */}
        {regularGuides.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                <Users className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tour Guides ({regularGuides.length})
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regularGuides.map((guide, index) => (
                <Card key={guide._id || index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-900">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16 ring-2 ring-primary-100 dark:ring-primary-800">
                        <AvatarImage src={guide.photo} alt={guide.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-700 text-white text-lg">
                          {guide.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {guide.name}
                          </h4>
                          <Badge className={cn("gap-1", getRoleBadgeColor(guide.role))}>
                            {getRoleIcon(guide.role)}
                            <span className="text-xs">{getRoleDisplayName(guide.role)}</span>
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span>4.8</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>3+ years</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                          Passionate guide dedicated to showing you the best local experiences
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Fun Facts Section - Enhanced */}
        <div className="mt-6 p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-100 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Did you know?
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                All our guides are certified local experts with extensive knowledge of the region's 
                history, culture, and hidden gems. They're passionate about creating unforgettable experiences!
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
            <Shield className="h-3 w-3 text-primary-500" />
            <span>100% certified guides with background checks</span>
          </div>
        </div>
      </div>
    </div>
  );
};