import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/types';
import { Award, Calendar, Mail, MapPin, Star, Users } from 'lucide-react';

interface TourGuidesProps {
  guides: User[];
}

const getRoleBadgeColor = (role: string) => {
  const colors: Record<string, string> = {
    'lead-guide': 'bg-amber-100 text-amber-700 border-amber-200',
    'guide': 'bg-blue-100 text-blue-700 border-blue-200',
    'user': 'bg-gray-100 text-gray-700 border-gray-200',
    'admin': 'bg-purple-100 text-purple-700 border-purple-200',
  };
  return colors[role] || colors['user'];
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'lead-guide':
      return <Award className="h-4 w-4" />;
    case 'guide':
      return <MapPin className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold">Your Tour Guides</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Meet our experienced local guides who will make your journey unforgettable
      </p>

      {/* Lead Guide Section */}
      {leadGuide && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Lead Guide
          </h3>
          <Card className="overflow-hidden border-primary-100 bg-gradient-to-r from-primary-50/50 to-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary-200">
                    <AvatarImage src={leadGuide.photo} alt={leadGuide.name} />
                    <AvatarFallback className="text-2xl bg-primary-100 text-primary-700">
                      {leadGuide.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <Badge className={getRoleBadgeColor(leadGuide.role)}>
                      {getRoleIcon(leadGuide.role)}
                      <span className="ml-1">{getRoleDisplayName(leadGuide.role)}</span>
                    </Badge>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{leadGuide.name}</h3>
                  <p className="text-gray-600 mb-3">
                    Expert local guide with years of experience in leading adventure tours
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>4.9 (128 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>5+ years experience</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>Local expert</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline" className="gap-1">
                      <Mail className="h-3 w-3" />
                      {leadGuide.email}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      Speaks English, Local Language
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
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary-600" />
            Tour Guides ({regularGuides.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regularGuides.map((guide, index) => (
              <Card key={guide._id || index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={guide.photo} alt={guide.name} />
                      <AvatarFallback className="bg-primary-100 text-primary-700 text-lg">
                        {guide.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-semibold text-gray-900">{guide.name}</h4>
                        <Badge className={getRoleBadgeColor(guide.role)}>
                          {getRoleIcon(guide.role)}
                          <span className="ml-1">{getRoleDisplayName(guide.role)}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span>4.8</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>3+ years</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
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

      {/* Fun Facts Section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Did you know?</h4>
            <p className="text-sm text-gray-600">
              All our guides are certified local experts with extensive knowledge of the region's 
              history, culture, and hidden gems. They're passionate about creating unforgettable experiences!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};